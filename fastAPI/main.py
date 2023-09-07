from fastapi import FastAPI, HTTPException, Depends
from starlette.middleware.cors import CORSMiddleware
from typing import Annotated, List, Optional
from pydantic import BaseModel, Field
from enum import Enum
import model
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()
model.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*'],
)


class MovieBase(BaseModel):
    title: str
    author: str
    description: str
    duration: float

    isDone: Optional[bool]


class MovieTransaction(MovieBase):
    id: int

    class Config:
        orm_mode = True


@app.get("/movies/", response_model=List[MovieTransaction])
async def get_all(db: db_dependency, skip: int = 0, limit: int = 100):
    all_movies = db.query(model.Movies).order_by(
        model.Movies.id.desc()).limit(limit)
    return all_movies


@app.get("/movies/{movie_id}")
async def get_by_ID(movie_id: int, db: db_dependency):
    movie = db.query(model.Movies).filter(model.Movies.id == movie_id).first()
    if movie is None:
        raise HTTPException(
            status_code=404,
            detail=f'Фильма с ID={movie_id} нет в наличии'
        )
    return movie


@app.post("/create_movie/", response_model=MovieTransaction)
async def create_movie(movie: MovieBase, db: Session = Depends(get_db)):
    db_transaction = model.Movies(**movie.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@app.delete("/delete/{movie_id}")
async def delete_movie(movie_id: int, movie: MovieTransaction, db: Session = Depends(get_db)):
    movie_model = db.query(model.Movies).filter(
        model.Movies.id == movie_id).first()

    if movie_model is None:
        raise HTTPException(
            status_code=404,
            detail=f'ID{movie_id}: Да нет такого епт'
        )
    movie_model = db.query(model.Movies).filter(
        model.Movies.id == movie_id).delete()
    db.commit()
    return movie

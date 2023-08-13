from fastapi import FastAPI, HTTPException, Depends
from starlette.middleware.cors import CORSMiddleware
from typing import Annotated, List
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

fake_movies_db = [{"item_name": "Wagner"}, {"item_name": "Africa"}, {"item_name": "Niggers"}]

class Movie(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1)
    description: str = Field(min_length=1)
    duration: float = Field(gt=-1,lt=180)

@app.get("/movies/", response_model=List[Movie])
async def get_all(db: db_dependency, skip: int=0, limit: int = 100):
    return db.query(model.Movies).offset(skip).limit(limit).all()

@app.get("/movies/{movie_id}")
async def get_by_ID(movie_id: int, db: db_dependency):
    movie = db.query(model.Movies).filter(model.Movies.id==movie_id).first()
    if movie is None:
        raise HTTPException(
            status_code=404,
            detail=f'Фильма с ID={movie_id} нет в наличии'
        )
    return movie

@app.post("/create_movie/")
async def create_movie(movie:Movie, db: Session = Depends(get_db)):
    movie_model = model.Movies()
    movie_model.title = movie.title
    movie_model.author = movie.author
    movie_model.description = movie.description
    movie_model.duration = movie.duration
    db.add(movie_model)
    db.commit()
    return movie

@app.put("create/{movie_id}")
async def update_movie(movie_id:int, movie:Movie,db: db_dependency):
    movie_model = db.query(model.Movies).filter(model.Movies.id == movie_id).first()

    if movie_model is None:
        raise HTTPException(
            status_code=404,
            detail=f'ID{movie_id}: Да нет такого епт'
        )
    movie_model.duration = movie.duration

    db.add(movie_model)
    db.commit()    
    return movie

@app.delete("delete/{movie_id}")
async def delete_movie(movie_id:int, movie:Movie,db: Session = Depends(get_db)):
    movie_model = db.query(model.Movies).filter(model.Movies.id == movie_id).first()

    if movie_model is None:
        raise HTTPException(
            status_code=404,
            detail=f'ID{movie_id}: Да нет такого епт'
        )
    movie_model = db.query(model.Movies).filter(model.Movies.id == movie_id).delete()
    db.commit()    
    return movie 

from ast import Dict
import model
import uuid
from fastapi import FastAPI, HTTPException, Depends
from starlette.middleware.cors import CORSMiddleware
from typing import Annotated, List, Optional
from pydantic import BaseModel, Field
from auth import auth_backend, current_active_user, fastapi_users
from database import User, get_async_session
from schemas import MovieBase, MoviesUser, UserCreate, UserRead, UserUpdate
import aiosqlite
from sqlalchemy.ext.asyncio import AsyncSession
from pathlib import Path
from sqlalchemy.sql import text
from schemas import UserRead
import socketio


app = FastAPI()
origins = ['http://localhost:8000/auth/jwt/login', 'http://127.0.0.1:8000/', 'http://localhost:3000', 'http://localhost:8000']

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

DB_FILE= Path("movies.db")

async def get_db():
    db = await aiosqlite.connect(DB_FILE)
    db.row_factory = aiosqlite.Row

    try:
        yield db
    finally:
        await db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True,
)

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}

@app.get("/movies/", response_model=MoviesUser)
async def get_all(user: User = Depends(current_active_user), db: AsyncSession=Depends(get_async_session)):
    res = await db.execute(text("SELECT * FROM movies ORDER BY id ASC"))
    await db.commit()
    results = {'user': user, 'movies': res}
    return results

@app.post("/create_movie/", response_model=MovieBase)
async def create_movie(movie: MovieBase, db: AsyncSession=Depends(get_async_session)):
    new_movie = model.Movies(**movie.dict())
    db.add(new_movie)
    await db.commit()
    return new_movie

@app.delete("/delete/{movie_id}")
async def delete_movie(movie_id: int,  db: AsyncSession=Depends(get_async_session)):
    movie_model = await db.get(model.Movies, movie_id)
    if movie_model is None:
        raise HTTPException(
        status_code=404,
        detail=f'ID{movie_id}: Да нет такого епт'
        )
    await db.delete(movie_model)
    await db.commit()
    return movie_model

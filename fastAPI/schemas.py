import uuid
from typing import Dict, List, Optional, Union
from pydantic import BaseModel
from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    role: str

class UserCreate(schemas.BaseUserCreate):
    role: str

class UserUpdate(schemas.BaseUserUpdate):
    role: str

class MovieBase(BaseModel):
    title: Optional[str]
    author: Optional[str]
    description: Optional[str]
    duration: Optional[float]
    isDone: Optional[bool]

class MovieTransaction(MovieBase):
    id: int

    class Config:
        orm_mode = True

class MoviesUser(BaseModel):
    movies: List[MovieTransaction]
    user: UserRead

from typing import AsyncGenerator

from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import  Column, Integer, String
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from sqlalchemy.orm import DeclarativeBase

SQLALCHEMY_DATABASE_URL = 'sqlite+aiosqlite:///./movies.db'

class Base(DeclarativeBase):
    pass

class User(SQLAlchemyBaseUserTableUUID, Base):
    role = Column(String)

engine = create_async_engine(SQLALCHEMY_DATABASE_URL)
async_session_maker = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)



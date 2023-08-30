from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base


class Movies(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author = Column(String)
    description = Column(String)
    duration = Column(Float)
    isDone = Column(Boolean, default=False)

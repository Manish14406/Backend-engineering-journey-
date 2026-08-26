# models.py what the database looks like 

from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class Task(Base):
    __tablename__ = "tasks"

    # Unique identifier for each task
    id = Column(Integer, primary_key=True, index=True)

    # Stores the task title
    title = Column(String)

    # Stores additional details about the task
    description = Column(String)

    # Stores whether the task is completed
    completed = Column(Boolean, default=False)


           # python representation of database table 

# Task model
#      ↓
# tasks table
#      ↓
# ┌────┬─────────┬─────────────┬───────────┐
# │ id │ title   │ description │ completed │
# ├────┼─────────┼─────────────┼───────────┤
# │ 1  │ FastAPI │ Day 7       │ false     │
# └────┴─────────┴─────────────┴───────────┘
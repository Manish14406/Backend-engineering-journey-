# create_engine connection mechanism between python application and the database 

from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

# Database location and type (SQLite)
DATABASE_URL = "sqlite:///./task.db"

# Creates the SQLAlchemy engine to communicate with the database
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create database session used to interact with the database 
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# When request comes to our api and we need database then database session is created for each request and closed after use  
def get_db():
    db = SessionLocal() #creates database session 

    try:
        yield db   # gives that session to api so it can do things like db.add(),db.commit(),db.query(),db.delete()
    finally:
        db.close() # closes the session after the request is deleted 

#Engine = connection mechanism between database and python application 
#Session = actualy working conversation with the database 

# Base class used to create SQLAlchemy database models 
Base = declarative_base()

# DATABASE_URL → Where is my database?

# engine       → How do I connect to it?

# Session      → How do I work with it?

# Base         → How do I define database tables/models?

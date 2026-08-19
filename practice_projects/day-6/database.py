from sqlalchemy import Column,Integer,String
from sqlalchemy.ext.declarative import declarative_base

# This Base class is the parent for all data base table 
# Any class that inherits from the Base becomes a table in the database
Base = declarative_base()

class Idea(Base):

    #Name of the table inside SQLite database
    __tablename__ = "ideas"
    
    #Primary key for the column and the unique id for the each column 
    # It automatically increase 
    id = Column(Integer,primary_key=True,index=True)

    title = Column(String,primary_key=True,nullable=False)

    description = Column(String,nullable = False)
   
    status = Column(String,default="pending")

# the above is the table with its name idea and it has column as attributes which has unique id,title,description,and in default it has a status of pending.

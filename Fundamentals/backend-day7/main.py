from fastapi import FastAPI,Depends
from database import engine,Base,get_db
from models import Task 
from schemas import TaskCreate



app = FastAPI()

# take all the table structures registered  with Base and create them in database connected through the engine 
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return{"message": "Backend is running"}

# task : TaskCreate fastapi expects the incoming request body to follow out Taskcreate schema 
# db=Depends(get_db) fastapi creates a endpoint a database session   

# task validate request data and db creates database session 

# task what the user sent 
# db how we communicate with the database 
@app.post("/tasks")
def create_task(task: TaskCreate, db=Depends(get_db)):
        new_task = Task(
        title=task.title,
        description=task.description
        )  
        db.add(new_task) 
        db.commit()
        db.refresh(new_task)

        return new_task

# db.add(new_task)
#       ↓
# "Session, I want to save this object."

# db.commit()
#       ↓
# "Okay, permanently apply that change to the database."

#db.refresh()
#    |
# "Go back to the database and refresh this Python object with the latest values."




# POST /tasks
#      ↓
# FastAPI
#      ↓
# Depends(get_db)
#      ↓
# get_db()
#      ↓
# Create DB session
#      ↓
# Give session to endpoint
#      ↓
# Endpoint uses `db`
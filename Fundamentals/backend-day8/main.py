from fastapi import FastAPI, Depends,HTTPException
from database import engine, Base, get_db
from models import Task
from schemas import TaskCreate, TaskUpdate

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Day 8 backend is running"}


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

@app.get("/tasks")
def get_tasks(db=Depends(get_db)):
    tasks = db.query(Task).all()      # db= database session Task= our database model .all()=give us all matching records 
    return tasks

        # GET /tasks
        #     ↓
        # get_tasks()
        #     ↓
        # Depends(get_db)
        #     ↓
        # DB session
        #     ↓
        # db.query(Task).all()
        #     ↓
        # Database
        #     ↓
        # All Task records
        #     ↓
        # return tasks
@app.get("/tasks/{task_id}")
def get_task(task_id: int, db=Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()   # "Find the task whose database ID matches the ID provided in the URL."

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task 


@app.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    task: TaskUpdate,
    db=Depends(get_db)
):
    print("RECEIVED:", task.completed)
    existing_task = db.query(Task).filter(Task.id == task_id).first()
    if existing_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    existing_task.title = task.title
    existing_task.description = task.description
    existing_task.completed = task.completed

    db.commit()

    return existing_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db=Depends(get_db)):

    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}
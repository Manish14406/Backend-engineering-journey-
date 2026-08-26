from fastapi import APIRouter, Depends, HTTPException

from database import get_db
from models import Task
from schemas import TaskCreate, TaskUpdate
from services import task_service


router = APIRouter()


# CREATE
@router.post("/tasks")
def create_task(task: TaskCreate, db=Depends(get_db)):
    return task_service.create_task(db, task)


# READ ALL
@router.get("/tasks")
def get_tasks(db=Depends(get_db)):
    tasks = db.query(Task).all()

    return tasks


# READ ONE
@router.get("/tasks/{task_id}")
def get_task(task_id: int, db=Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


# UPDATE
@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    task: TaskUpdate,
    db=Depends(get_db)
):
    existing_task = task_service.update_task(
        db,
        task_id,
        task
    )

    if existing_task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return existing_task


# DELETE
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db=Depends(get_db)):
    task = task_service.delete_task(db, task_id)

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {"message": "Task deleted successfully"}
from models import Task


def create_task(db, task):
    new_task = Task(
        title=task.title,
        description=task.description
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


def update_task(db, task_id, task):
    existing_task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if existing_task is None:
        return None

    existing_task.title = task.title
    existing_task.description = task.description
    existing_task.completed = task.completed

    db.commit()

    return existing_task


def delete_task(db, task_id):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if task is None:
        return None

    db.delete(task)
    db.commit()

    return task
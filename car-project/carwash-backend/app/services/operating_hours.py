from sqlalchemy.orm import Session

from app.models.operating_hours import OperatingHours
from app.schemas.operating_hours import (
    OperatingHoursCreate,
    OperatingHoursUpdate,
)


def create_operating_hours(
    db: Session,
    hours_data: OperatingHoursCreate
):
    operating_hours = OperatingHours(
        day_of_week=hours_data.day_of_week,
        open_time=hours_data.open_time,
        close_time=hours_data.close_time,
        is_closed=hours_data.is_closed,
    )

    db.add(operating_hours)
    db.commit()
    db.refresh(operating_hours)

    return operating_hours


def get_operating_hours(db: Session):
    return db.query(OperatingHours).all()


def get_operating_hours_by_id(
    db: Session,
    hours_id: int
):
    return db.query(OperatingHours).filter(
        OperatingHours.id == hours_id
    ).first()


def update_operating_hours(
    db: Session,
    operating_hours: OperatingHours,
    hours_data: OperatingHoursUpdate
):
    update_data = hours_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(operating_hours, field, value)

    db.commit()
    db.refresh(operating_hours)

    return operating_hours


def delete_operating_hours(
    db: Session,
    operating_hours: OperatingHours
):
    db.delete(operating_hours)
    db.commit()
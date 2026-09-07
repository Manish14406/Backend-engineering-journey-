from datetime import date, time
from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.models.wash_bay import WashBay
from app.schemas.wash_bay import WashBayCreate, WashBayUpdate



def create_wash_bay(db: Session, wash_bay_data: WashBayCreate):
    wash_bay = WashBay(
        name=wash_bay_data.name,
    )

    db.add(wash_bay)
    db.commit()
    db.refresh(wash_bay)

    return wash_bay


def get_wash_bays(db: Session):
    return db.query(WashBay).all()


def get_wash_bay(db: Session, wash_bay_id: int):
    return db.query(WashBay).filter(
        WashBay.id == wash_bay_id
    ).first()


def update_wash_bay(
    db: Session,
    wash_bay: WashBay,
    wash_bay_data: WashBayUpdate
):
    update_data = wash_bay_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(wash_bay, field, value)

    db.commit()
    db.refresh(wash_bay)

    return wash_bay


def delete_wash_bay(db: Session, wash_bay: WashBay):
    db.delete(wash_bay)
    db.commit()
def get_available_wash_bay(
    db: Session,
    booking_date: date,
    start_time: time,
    end_time: time
    ):
    wash_bays = db.query(WashBay).filter(
        WashBay.is_active == True
    ).all()

    for wash_bay in wash_bays:
        conflicting_booking = db.query(Booking).filter(
            Booking.wash_bay_id == wash_bay.id,
            Booking.booking_date == booking_date,
            Booking.status != "cancelled",
            Booking.start_time < end_time,
            Booking.end_time > start_time
        ).first()

        if conflicting_booking is None:
            return wash_bay

    return None
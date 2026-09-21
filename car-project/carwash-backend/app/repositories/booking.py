from datetime import date, time

from sqlalchemy.orm import Session

from app.models.booking import Booking


def get_booking_by_id(
    db: Session,
    booking_id: int,
):
    return (
        db.query(Booking)
        .filter(Booking.id == booking_id)
        .first()
    )


def get_all_bookings(db: Session):
    return db.query(Booking).all()


def get_conflicting_booking(
    db: Session,
    wash_bay_id: int,
    booking_date: date,
    start_time: time,
    end_time: time,
):
    return (
        db.query(Booking)
        .filter(
            Booking.wash_bay_id == wash_bay_id,
            Booking.booking_date == booking_date,
            Booking.status != "cancelled",
            Booking.start_time < end_time,
            Booking.end_time > start_time,
        )
        .first()
    )


def create_booking(
    db: Session,
    booking: Booking,
):
    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking
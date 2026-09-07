from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.models.plan import Plan
from app.models.user import User
from app.models.wash_bay import WashBay
from app.schemas.booking import BookingCreate


def create_booking(db: Session, booking_data: BookingCreate):
    customer = db.query(User).filter(
        User.id == booking_data.customer_id
    ).first()

    if customer is None:
        raise ValueError("Customer not found")

    plan = db.query(Plan).filter(
        Plan.id == booking_data.plan_id
    ).first()

    if plan is None:
        raise ValueError("Plan not found")

    wash_bay = db.query(WashBay).filter(
        WashBay.id == booking_data.wash_bay_id
    ).first()

    if wash_bay is None:
        raise ValueError("Wash bay not found")

    if booking_data.start_time >= booking_data.end_time:
        raise ValueError("End time must be after start time")

    conflicting_booking = db.query(Booking).filter(
        Booking.wash_bay_id == booking_data.wash_bay_id,
        Booking.booking_date == booking_data.booking_date,
        Booking.status != "cancelled",
        Booking.start_time < booking_data.end_time,
        Booking.end_time > booking_data.start_time
    ).first()

    if conflicting_booking is not None:
        raise ValueError(
            "Wash bay is already booked for this time"
        )

    booking = Booking(
        customer_id=booking_data.customer_id,
        plan_id=booking_data.plan_id,
        wash_bay_id=booking_data.wash_bay_id,
        booking_date=booking_data.booking_date,
        start_time=booking_data.start_time,
        end_time=booking_data.end_time,
        status="pending",
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


def get_bookings(db: Session):
    return db.query(Booking).all()


def get_booking(db: Session, booking_id: int):
    return db.query(Booking).filter(
        Booking.id == booking_id
    ).first()
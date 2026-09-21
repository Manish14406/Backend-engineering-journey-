from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.repositories.booking import (
    create_booking as save_booking,
    get_all_bookings,
    get_booking_by_id,
    get_conflicting_booking,
)
from app.models.plan import Plan
from app.models.user import User
from app.models.wash_bay import WashBay
from app.schemas.booking import BookingCreate


def create_booking(db: Session, booking_data: BookingCreate):

    # 1. Check customer
    customer = db.query(User).filter(
        User.id == booking_data.customer_id
    ).first()

    if customer is None:
        raise ValueError("Customer not found")

    # 2. Check plan
    plan = db.query(Plan).filter(
        Plan.id == booking_data.plan_id
    ).first()

    if plan is None:
        raise ValueError("Plan not found")

    # 3. Check wash bay
    wash_bay = db.query(WashBay).filter(
        WashBay.id == booking_data.wash_bay_id
    ).first()

    if wash_bay is None:
        raise ValueError("Wash bay not found")

    # 4. Validate time
    if booking_data.start_time >= booking_data.end_time:
        raise ValueError("End time must be after start time")

    # 5. Check booking conflict
    conflicting_booking = get_conflicting_booking(
        db=db,
        wash_bay_id=booking_data.wash_bay_id,
        booking_date=booking_data.booking_date,
        start_time=booking_data.start_time,
        end_time=booking_data.end_time,
    )

    if conflicting_booking is not None:
        raise ValueError(
            "Wash bay is already booked for this time"
        )

    # 6. Create booking object
    booking = Booking(
        customer_id=booking_data.customer_id,
        plan_id=booking_data.plan_id,
        wash_bay_id=booking_data.wash_bay_id,
        booking_date=booking_data.booking_date,
        start_time=booking_data.start_time,
        end_time=booking_data.end_time,
        status="pending",
    )

    # 7. Save through repository
    return save_booking(db, booking)


def get_bookings(db: Session):
    return get_all_bookings(db)


def get_booking(db: Session, booking_id: int):
    return get_booking_by_id(db, booking_id)
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.booking import BookingCreate, BookingResponse
from app.services.booking import (
    create_booking,
    get_bookings,
    get_booking,
)


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


@router.post(
    "/",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED
)
def create_booking_endpoint(
    booking_data: BookingCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_booking(db, booking_data)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error)
        )


@router.get(
    "/",
    response_model=list[BookingResponse]
)
def get_bookings_endpoint(
    db: Session = Depends(get_db)
):
    return get_bookings(db)


@router.get(
    "/{booking_id}",
    response_model=BookingResponse
)
def get_booking_endpoint(
    booking_id: int,
    db: Session = Depends(get_db)
):
    booking = get_booking(db, booking_id)

    if booking is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )

    return booking
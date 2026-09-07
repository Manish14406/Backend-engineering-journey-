from datetime import datetime

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Time
from sqlalchemy.orm import relationship

from app.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    plan_id = Column(
        Integer,
        ForeignKey("plans.id"),
        nullable=False,
        index=True
    )

    wash_bay_id = Column(
        Integer,
        ForeignKey("wash_bays.id"),
        nullable=False,
        index=True
    )

    booking_date = Column(
        Date,
        nullable=False,
        index=True
    )

    start_time = Column(
        Time,
        nullable=False
    )

    end_time = Column(
        Time,
        nullable=False
    )

    status = Column(
        String(30),
        nullable=False,
        default="pending",
        index=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    customer = relationship(
        "User",
        back_populates="bookings"
    )

    plan = relationship(
        "Plan",
        back_populates="bookings"
    )

    wash_bay = relationship(
        "WashBay",
        back_populates="bookings"
    )
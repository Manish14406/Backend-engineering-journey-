from sqlalchemy import Column, Date, ForeignKey, Integer, String, Time
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
        default="pending"
    )

    customer = relationship(
        "User"
    )

    plan = relationship(
        "Plan"
    )

    wash_bay = relationship(
        "WashBay"
    )
from sqlalchemy import Boolean, Column, Integer, Time

from app.database import Base


class OperatingHours(Base):
    __tablename__ = "operating_hours"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    day_of_week = Column(
        Integer,
        nullable=False,
        unique=True
    )

    open_time = Column(
        Time,
        nullable=True
    )

    close_time = Column(
        Time,
        nullable=True
    )

    is_closed = Column(
        Boolean,
        nullable=False,
        default=False
    )
    
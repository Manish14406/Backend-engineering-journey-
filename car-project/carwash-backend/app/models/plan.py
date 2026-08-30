from sqlalchemy import Boolean, Column, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(100),
        nullable=False,
        unique=True
    )

    description = Column(
        Text,
        nullable=True
    )

    price = Column(
        Numeric(10, 2),
        nullable=False
    )

    duration_minutes = Column(
        Integer,
        nullable=False
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True
    )

    features = relationship(
        "PlanFeature",
        back_populates="plan",
        cascade="all, delete-orphan"
    )
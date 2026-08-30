from sqlalchemy import Boolean, Column, Integer, String

from app.database import Base


class WashBay(Base):
    __tablename__ = "wash_bays"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False,
        unique=True
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True
    )
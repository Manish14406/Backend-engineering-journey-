from sqlalchemy import Boolean, Column, Integer, String, Text

from app.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(
        String(100),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    icon_url = Column(
        String(255),
        nullable=True
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True
    )
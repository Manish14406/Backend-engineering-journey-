from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from sqlalchemy.orm import relationship

from app.database import Base


class PlanFeature(Base):
    __tablename__ = "plan_features"

    id = Column(Integer, primary_key=True, index=True)

    plan_id = Column(
        Integer,
        ForeignKey("plans.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    name = Column(
        String(150),
        nullable=False
    )

    is_included = Column(
        Boolean,
        nullable=False,
        default=True
    )

    plan = relationship(
        "Plan",
        back_populates="features"
    )
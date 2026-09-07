from sqlalchemy.orm import Session

from app.models.plan import Plan
from app.models.plan_feature import PlanFeature
from app.schemas.plan import PlanCreate, PlanUpdate


def create_plan(db: Session, plan_data: PlanCreate):
    plan = Plan(
        name=plan_data.name,
        description=plan_data.description,
        price=plan_data.price,
        duration_minutes=plan_data.duration_minutes,
    )

    for feature_data in plan_data.features:
        feature = PlanFeature(
            name=feature_data.name,
            is_included=feature_data.is_included,
        )

        plan.features.append(feature)

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan


def get_plans(db: Session):
    return db.query(Plan).all()


def get_plan(db: Session, plan_id: int):
    return db.query(Plan).filter(Plan.id == plan_id).first()


def update_plan(
    db: Session,
    plan: Plan,
    plan_data: PlanUpdate
):
    update_data = plan_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(plan, field, value)

    db.commit()
    db.refresh(plan)

    return plan


def delete_plan(db: Session, plan: Plan):
    db.delete(plan)
    db.commit()
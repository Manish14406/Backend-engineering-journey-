from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.plan import (
    PlanCreate,
    PlanResponse,
    PlanUpdate,
)
from app.services.plan import (
    create_plan,
    delete_plan,
    get_plan,
    get_plans,
    update_plan,
)


router = APIRouter(
    prefix="/plans",
    tags=["Plans"]
)


@router.post(
    "/",
    response_model=PlanResponse,
    status_code=status.HTTP_201_CREATED
)
def create_plan_endpoint(
    plan_data: PlanCreate,
    db: Session = Depends(get_db)
):
    return create_plan(db, plan_data)


@router.get(
    "/",
    response_model=list[PlanResponse]
)
def get_all_plans(
    db: Session = Depends(get_db)
):
    return get_plans(db)


@router.get(
    "/{plan_id}",
    response_model=PlanResponse
)
def get_single_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):
    plan = get_plan(db, plan_id)

    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )

    return plan


@router.put(
    "/{plan_id}",
    response_model=PlanResponse
)
def update_plan_endpoint(
    plan_id: int,
    plan_data: PlanUpdate,
    db: Session = Depends(get_db)
):
    plan = get_plan(db, plan_id)

    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )

    return update_plan(db, plan, plan_data)


@router.delete(
    "/{plan_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_plan_endpoint(
    plan_id: int,
    db: Session = Depends(get_db)
):
    plan = get_plan(db, plan_id)

    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Plan not found"
        )

    delete_plan(db, plan)
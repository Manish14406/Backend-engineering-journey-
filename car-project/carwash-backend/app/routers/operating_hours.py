from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.operating_hours import (
    OperatingHoursCreate,
    OperatingHoursResponse,
    OperatingHoursUpdate,
)
from app.services.operating_hours import (
    create_operating_hours,
    delete_operating_hours,
    get_operating_hours,
    get_operating_hours_by_id,
    update_operating_hours,
)


router = APIRouter(
    prefix="/operating-hours",
    tags=["Operating Hours"]
)


@router.post(
    "/",
    response_model=OperatingHoursResponse,
    status_code=status.HTTP_201_CREATED
)
def create_operating_hours_endpoint(
    hours_data: OperatingHoursCreate,
    db: Session = Depends(get_db)
):
    return create_operating_hours(db, hours_data)


@router.get(
    "/",
    response_model=list[OperatingHoursResponse]
)
def get_all_operating_hours(
    db: Session = Depends(get_db)
):
    return get_operating_hours(db)


@router.get(
    "/{hours_id}",
    response_model=OperatingHoursResponse
)
def get_single_operating_hours(
    hours_id: int,
    db: Session = Depends(get_db)
):
    operating_hours = get_operating_hours_by_id(
        db,
        hours_id
    )

    if operating_hours is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operating hours not found"
        )

    return operating_hours


@router.put(
    "/{hours_id}",
    response_model=OperatingHoursResponse
)
def update_operating_hours_endpoint(
    hours_id: int,
    hours_data: OperatingHoursUpdate,
    db: Session = Depends(get_db)
):
    operating_hours = get_operating_hours_by_id(
        db,
        hours_id
    )

    if operating_hours is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operating hours not found"
        )

    return update_operating_hours(
        db,
        operating_hours,
        hours_data
    )


@router.delete(
    "/{hours_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_operating_hours_endpoint(
    hours_id: int,
    db: Session = Depends(get_db)
):
    operating_hours = get_operating_hours_by_id(
        db,
        hours_id
    )

    if operating_hours is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operating hours not found"
        )

    delete_operating_hours(
        db,
        operating_hours
    )
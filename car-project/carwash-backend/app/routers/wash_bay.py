from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date, time
from fastapi import Query
from app.database import get_db
from app.schemas.wash_bay import (
    WashBayCreate,
    WashBayResponse,
    WashBayUpdate,
)
from app.services.wash_bay import (
    create_wash_bay,
    delete_wash_bay,
    get_wash_bay,
    get_wash_bays,
    update_wash_bay,
)
from app.services.wash_bay import get_available_wash_bay


router = APIRouter(
    prefix="/wash-bays",
    tags=["Wash Bays"]
)


@router.post(
    "/",
    response_model=WashBayResponse,
    status_code=status.HTTP_201_CREATED
)
def create_wash_bay_endpoint(
    wash_bay_data: WashBayCreate,
    db: Session = Depends(get_db)
):
    return create_wash_bay(db, wash_bay_data)


@router.get(
    "/",
    response_model=list[WashBayResponse]
)
def get_all_wash_bays(
    db: Session = Depends(get_db)
):
    return get_wash_bays(db)

@router.get("/available")
def get_available_wash_bay_endpoint(
    booking_date: date = Query(...),
    start_time: time = Query(...),
    end_time: time = Query(...),
    db: Session = Depends(get_db)
    ):
    wash_bay = get_available_wash_bay(
        db,
        booking_date,
        start_time,
        end_time
    )

    if wash_bay is None:
        raise HTTPException(
            status_code=404,
            detail="No wash bay available for this time"
        )

    return {
        "wash_bay_id": wash_bay.id,
        "wash_bay_name": wash_bay.name
    }

@router.get(
    "/{wash_bay_id}",
    response_model=WashBayResponse
)
def get_single_wash_bay(
    wash_bay_id: int,
    db: Session = Depends(get_db)
):
    wash_bay = get_wash_bay(db, wash_bay_id)

    if wash_bay is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wash bay not found"
        )

    return wash_bay


@router.put(
    "/{wash_bay_id}",
    response_model=WashBayResponse
)
def update_wash_bay_endpoint(
    wash_bay_id: int,
    wash_bay_data: WashBayUpdate,
    db: Session = Depends(get_db)
):
    wash_bay = get_wash_bay(db, wash_bay_id)

    if wash_bay is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wash bay not found"
        )

    return update_wash_bay(
        db,
        wash_bay,
        wash_bay_data
    )


@router.delete(
    "/{wash_bay_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_wash_bay_endpoint(
    wash_bay_id: int,
    db: Session = Depends(get_db)
):
    wash_bay = get_wash_bay(db, wash_bay_id)

    if wash_bay is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wash bay not found"
        )

    delete_wash_bay(db, wash_bay)



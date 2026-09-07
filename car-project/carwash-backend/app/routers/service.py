from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.service import (
    ServiceCreate,
    ServiceResponse,
    ServiceUpdate,
)
from app.services.service import (
    create_service,
    delete_service,
    get_service,
    get_services,
    update_service,
)


router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@router.post(
    "/",
    response_model=ServiceResponse,
    status_code=status.HTTP_201_CREATED
)
def create_service_endpoint(
    service_data: ServiceCreate,
    db: Session = Depends(get_db)
):
    return create_service(db, service_data)


@router.get(
    "/",
    response_model=list[ServiceResponse]
)
def get_all_services(
    db: Session = Depends(get_db)
):
    return get_services(db)


@router.get(
    "/{service_id}",
    response_model=ServiceResponse
)
def get_single_service(
    service_id: int,
    db: Session = Depends(get_db)
):
    service = get_service(db, service_id)

    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )

    return service


@router.put(
    "/{service_id}",
    response_model=ServiceResponse
)
def update_service_endpoint(
    service_id: int,
    service_data: ServiceUpdate,
    db: Session = Depends(get_db)
):
    service = get_service(db, service_id)

    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )

    return update_service(db, service, service_data)


@router.delete(
    "/{service_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_service_endpoint(
    service_id: int,
    db: Session = Depends(get_db)
):
    service = get_service(db, service_id)

    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )

    delete_service(db, service)
from sqlalchemy.orm import Session

from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate


def create_service(db: Session, service_data: ServiceCreate):
    service = Service(
        title=service_data.title,
        description=service_data.description,
        icon_url=service_data.icon_url,
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    return service


def get_services(db: Session):
    return db.query(Service).all()


def get_service(db: Session, service_id: int):
    return db.query(Service).filter(Service.id == service_id).first()


def update_service(
    db: Session,
    service: Service,
    service_data: ServiceUpdate
):
    update_data = service_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(service, field, value)

    db.commit()
    db.refresh(service)

    return service


def delete_service(db: Session, service: Service):
    db.delete(service)
    db.commit()
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class PlanFeatureCreate(BaseModel):
    name: str
    is_included: bool = True


class PlanFeatureResponse(BaseModel):
    id: int
    name: str
    is_included: bool

    model_config = ConfigDict(from_attributes=True)


class PlanCreate(BaseModel):
    name: str
    description: str | None = None
    price: Decimal
    duration_minutes: int
    features: list[PlanFeatureCreate] = []


class PlanUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: Decimal | None = None
    duration_minutes: int | None = None
    is_active: bool | None = None


class PlanResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: Decimal
    duration_minutes: int
    is_active: bool
    features: list[PlanFeatureResponse] = []

    model_config = ConfigDict(from_attributes=True)
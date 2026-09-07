from pydantic import BaseModel, ConfigDict


class WashBayCreate(BaseModel):
    name: str


class WashBayUpdate(BaseModel):
    name: str | None = None
    is_active: bool | None = None


class WashBayResponse(BaseModel):
    id: int
    name: str
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
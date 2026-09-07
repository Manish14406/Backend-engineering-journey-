from pydantic import BaseModel, ConfigDict


class ServiceCreate(BaseModel):
    title: str
    description: str
    icon_url: str | None = None


class ServiceUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    icon_url: str | None = None
    is_active: bool | None = None


class ServiceResponse(BaseModel):
    id: int
    title: str
    description: str
    icon_url: str | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
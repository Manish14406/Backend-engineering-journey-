from datetime import time

from pydantic import BaseModel, ConfigDict


class OperatingHoursCreate(BaseModel):
    day_of_week: int
    open_time: time | None = None
    close_time: time | None = None
    is_closed: bool = False


class OperatingHoursUpdate(BaseModel):
    day_of_week: int | None = None
    open_time: time | None = None
    close_time: time | None = None
    is_closed: bool | None = None


class OperatingHoursResponse(BaseModel):
    id: int
    day_of_week: int
    open_time: time | None
    close_time: time | None
    is_closed: bool

    model_config = ConfigDict(from_attributes=True)
from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict


class BookingCreate(BaseModel):
    customer_id: int
    plan_id: int
    wash_bay_id: int
    booking_date: date
    start_time: time
    end_time: time


class BookingUpdate(BaseModel):
    booking_date: date | None = None
    start_time: time | None = None
    end_time: time | None = None
    wash_bay_id: int | None = None
    status: str | None = None


class BookingResponse(BaseModel):
    id: int
    customer_id: int
    plan_id: int
    wash_bay_id: int
    booking_date: date
    start_time: time
    end_time: time
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
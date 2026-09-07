from fastapi import FastAPI

from app.routers.service import router as service_router
from app.routers.plan import router as plan_router
from app.routers.wash_bay import router as wash_bay_router
from app.routers.operating_hours import router as operating_hours_router
from app.routers.booking import router as booking_router
from app.routers.user import router as user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Car Wash API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(service_router)
app.include_router(plan_router)
app.include_router(wash_bay_router)
app.include_router(operating_hours_router)
app.include_router(booking_router)
app.include_router(user_router)

@app.get("/")
def root():
    return {
        "message": "Car Wash API is running"
    }
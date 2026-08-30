from fastapi import FastAPI

app = FastAPI(
    title="Car Wash API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Car Wash API is running"
    }
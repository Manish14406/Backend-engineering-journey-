from database import SessionLocal
from models import User


db = SessionLocal()

user = db.query(User).filter(
    User.email == "havya@example.com"
).first()

user.role = "owner"

db.commit()

print("User role updated to:", user.role)

db.close()
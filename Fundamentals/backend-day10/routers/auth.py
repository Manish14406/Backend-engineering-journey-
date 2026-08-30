from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserLogin
from security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token,
)


router = APIRouter()

security = HTTPBearer()


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        email=user.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "email": new_user.email
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(existing_user.id)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    current_user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if current_user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return current_user

def require_owner(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "owner":
        raise HTTPException(
            status_code=403,
            detail="Owner access required"
        )

    return current_user

@router.get("/protected")
def protected(
    current_user: User = Depends(get_current_user)
):
    return {
        "message": "You accessed the protected route",
        "user_id": current_user.id,
        "email": current_user.email
    }

@router.get("/owner-only")
def owner_only(
    current_user: User = Depends(require_owner)
):
    return {
        "message": "Welcome, owner!",
        "user_id": current_user.id,
        "email": current_user.email,
        "role": current_user.role
    }
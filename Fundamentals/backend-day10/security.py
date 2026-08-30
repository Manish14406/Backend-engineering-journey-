import os
import jwt

from dotenv import load_dotenv
from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone



load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)


def create_access_token(user_id: int):
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=30)

    payload = {
        "sub": str(user_id),
        "exp": expiration_time
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token

def verify_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return payload

    except jwt.InvalidTokenError:
        return None
from fastapi import APIRouter
from pydantic import BaseModel

class LoginPayload(BaseModel):
    email: str
    password: str

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/auth/login")
def login(payload: LoginPayload):
    return {
        "success": True,
        "token": "mvp_mock_token_123",
        "user": {"email": payload.email, "role": "admin", "name": "MVP Admin"}
    }

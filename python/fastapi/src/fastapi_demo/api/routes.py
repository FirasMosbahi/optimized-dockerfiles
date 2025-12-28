from fastapi import APIRouter
from ..models.user import User

router = APIRouter()

@router.get("/")
def root():
    return {"message": "Hello, world!"}

@router.post("/users/")
def create_user(user: User):
    return {"message": f"User {user.name} created!", "user": user}

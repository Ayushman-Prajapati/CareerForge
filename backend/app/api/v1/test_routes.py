from fastapi import APIRouter, Depends

from app.api.dependencies.auth_dependency import (
    get_current_user
)

router = APIRouter()


@router.get("/protected")
def protected_route(
    current_user=Depends(get_current_user)
):

    return {
        "message": "Protected route accessed",
        "user": current_user
    }
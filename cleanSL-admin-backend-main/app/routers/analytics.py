from fastapi import APIRouter
from app.services.analytics import get_dashboard_summary

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary")
def read_dashboard_summary():
    return get_dashboard_summary()
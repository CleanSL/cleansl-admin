from fastapi import HTTPException
from app.core.supabase_client import supabase


def list_drivers():
    return supabase.table("users").select("*").eq("role", "driver").execute().data


def update_driver_profile(driver_id: str, payload: dict):
    existing = supabase.table("driver_profiles").select("user_id").eq("user_id", driver_id).execute().data
    if existing:
        return supabase.table("driver_profiles").update(payload).eq("user_id", driver_id).execute().data[0]
    payload["user_id"] = driver_id
    return supabase.table("driver_profiles").insert(payload).execute().data[0]


def create_driver_tracking(payload: dict):
    return supabase.table("driver_tracking").insert(payload).execute().data[0]


def get_driver_latest_location(driver_id: str):
    response = (
        supabase.table("driver_tracking")
        .select("*")
        .eq("driver_id", driver_id)
        .order("timestamp", desc=True)
        .limit(1)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="No tracking data found for this driver")
    return response.data[0]
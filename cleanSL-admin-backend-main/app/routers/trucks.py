from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/trucks", tags=["Trucks"])

class LocationPayload(BaseModel):
    latitude: float
    longitude: float
    speed: float = 0.0

# In-memory MVP persistence for live truck tracking
MOCK_TRUCKS_DB = {
    "T-01": {
        "id": "T-01",
        "location": "No. 45, Rosmead Place",
        "route": [[6.9145, 79.8650], [6.9150, 79.8660], [6.9165, 79.8655], [6.9180, 79.8640]]
    }
}

@router.get("")
def read_trucks():
    return {
        "activeTruck": MOCK_TRUCKS_DB["T-01"],
        "wards": [
            {"id": 1, "name": "Ward 07", "progress": 85, "status": "In Progress", "trucks": ["T-01", "T-02"]},
            {"id": 2, "name": "Ward 03", "progress": 100, "status": "Completed", "trucks": ["T-04"]}
        ]
    }

@router.post("/{truck_id}/location")
def update_truck_location(truck_id: str, payload: LocationPayload):
    if truck_id in MOCK_TRUCKS_DB:
        # Prepend the new live coordinate to the route so the dashboard map line dynamically grows!
        MOCK_TRUCKS_DB[truck_id]["route"].insert(0, [payload.latitude, payload.longitude])
        MOCK_TRUCKS_DB[truck_id]["location"] = f"Live tracking ({payload.speed} km/h)"
        return {"success": True, "message": f"Updated truck {truck_id} location"}
    return {"success": False, "message": "Truck not found"}, 404

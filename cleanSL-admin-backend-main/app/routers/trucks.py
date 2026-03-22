from fastapi import APIRouter

router = APIRouter(prefix="/trucks", tags=["Trucks"])

@router.get("")
def read_trucks():
    return {
        "activeTruck": {
            "id": "T-01",
            "location": "No. 45, Rosmead Place",
            "route": [[6.9145, 79.8650], [6.9150, 79.8660], [6.9165, 79.8655], [6.9180, 79.8640]]
        },
        "wards": [
            {"id": 1, "name": "Ward 07", "progress": 85, "status": "In Progress", "trucks": ["T-01", "T-02"]},
            {"id": 2, "name": "Ward 03", "progress": 100, "status": "Completed", "trucks": ["T-04"]}
        ]
    }

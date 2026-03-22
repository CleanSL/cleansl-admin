from fastapi import APIRouter

router = APIRouter(prefix="/violations", tags=["Violations"])

@router.get("")
def read_violations():
    return [
        { "date": "22/10/2026", "type": "Mixed Waste", "resident": "Kamal Perera", "status": "Confirmed", "score": 96 },
        { "date": "21/10/2026", "type": "Unsorted Plastics", "resident": "Nimal Fernando", "status": "Pending", "score": 88 }
    ]

@router.get("/stats/overview")
def read_violations_stats():
    return [
        { "label": "Total Violations", "value": "156", "trend": "+12%", "color": "text-theme-text" },
        { "label": "Pending Review", "value": "24", "trend": "+3%", "color": "text-theme-accent" },
        { "label": "Confirmed", "value": "89", "trend": "-5%", "color": "text-emerald-500" },
        { "label": "Disputed", "value": "12", "trend": "+1%", "color": "text-purple-500" }
    ]

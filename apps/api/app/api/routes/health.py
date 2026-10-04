from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
async def api_status():
    return {
        "api": "v1",
        "modules": ["market", "risk"],
        "note": "Analysis, signals, trading modules land in later phases",
    }

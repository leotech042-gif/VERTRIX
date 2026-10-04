from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.services.risk.engine import position_size

router = APIRouter()


class PositionSizeRequest(BaseModel):
    balance: float = Field(..., gt=0)
    risk_percent: float = Field(0.2, gt=0, le=5)
    entry: float
    stop: float
    point_value: float = Field(1.0, gt=0, description="$ per point for 1.0 lot")


@router.post("/position-size")
async def calc_position_size(body: PositionSizeRequest):
    return position_size(
        balance=body.balance,
        risk_percent=body.risk_percent,
        entry=body.entry,
        stop=body.stop,
        point_value=body.point_value,
    )

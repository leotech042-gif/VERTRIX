from fastapi import APIRouter

from app.api.routes import market, risk, health

api_router = APIRouter()
api_router.include_router(health.router, tags=["system"])
api_router.include_router(market.router, prefix="/market", tags=["market"])
api_router.include_router(risk.router, prefix="/risk", tags=["risk"])

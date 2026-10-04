from fastapi import APIRouter, HTTPException, Query

from app.services.market.service import MarketDataService

router = APIRouter()
service = MarketDataService()


@router.get("/symbols")
async def list_symbols():
    return {"symbols": service.list_symbols()}


@router.get("/klines")
async def get_klines(
    symbol: str = Query(..., description="Internal symbol e.g. BTCUSD, XAUUSD, EURUSD"),
    timeframe: str = Query("15m", description="1m,5m,15m,1h,4h,1d"),
    limit: int = Query(150, ge=10, le=1000),
):
    try:
        result = await service.get_klines(symbol=symbol.upper(), timeframe=timeframe, limit=limit)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Market data error: {e}") from e


@router.get("/ticker")
async def get_ticker(symbol: str = Query(...)):
    try:
        return await service.get_ticker(symbol=symbol.upper())
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e)) from e

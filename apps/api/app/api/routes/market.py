from fastapi import APIRouter, HTTPException, Query

from app.services.market.service import MarketDataService

router = APIRouter()
service = MarketDataService()


@router.get("/symbols")
async def list_symbols():
    return {"symbols": service.list_symbols()}


@router.get("/klines")
async def get_klines(
    symbol: str = Query(..., description="e.g. BTCUSD, XAUUSD, EURUSD"),
    timeframe: str = Query("15m"),
    limit: int = Query(200, ge=10, le=1000),
):
    try:
        return await service.get_klines(symbol=symbol.upper(), timeframe=timeframe, limit=limit)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Market data error: {e}") from e


@router.get("/ticker")
async def get_ticker(symbol: str = Query(...)):
    """Last, bid, ask, spread (book when available)."""
    try:
        return await service.get_ticker(symbol=symbol.upper())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e)) from e

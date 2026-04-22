from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ===== Models =====
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class RSVP(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    attending: str  # "yes" | "maybe" | "no"
    gift: str  # which wishlist item or custom
    performance: Optional[str] = None  # for the brokees
    message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class RSVPCreate(BaseModel):
    name: str
    attending: str
    gift: str
    performance: Optional[str] = None
    message: Optional[str] = None


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ===== RSVP =====
@api_router.post("/rsvp", response_model=RSVP)
async def create_rsvp(payload: RSVPCreate):
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name is required")
    if payload.attending not in {"yes", "maybe", "no"}:
        raise HTTPException(status_code=400, detail="Invalid attending value")
    if not payload.gift or not payload.gift.strip():
        raise HTTPException(status_code=400, detail="Gift is required — nobody comes empty-handed")

    rsvp = RSVP(
        name=name,
        attending=payload.attending,
        gift=payload.gift.strip(),
        performance=(payload.performance or "").strip() or None,
        message=(payload.message or "").strip() or None,
    )
    doc = rsvp.model_dump()
    await db.rsvps.insert_one(doc)
    return rsvp


@api_router.get("/rsvp", response_model=List[RSVP])
async def list_rsvps():
    items = await db.rsvps.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.get("/rsvp/stats")
async def rsvp_stats():
    total = await db.rsvps.count_documents({})
    yes = await db.rsvps.count_documents({"attending": "yes"})
    maybe = await db.rsvps.count_documents({"attending": "maybe"})
    no = await db.rsvps.count_documents({"attending": "no"})
    # gifts claimed (unique gift strings)
    claimed = await db.rsvps.distinct("gift")
    return {
        "total": total,
        "yes": yes,
        "maybe": maybe,
        "no": no,
        "claimed_gifts": claimed,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

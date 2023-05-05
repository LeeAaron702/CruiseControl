from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, checklist, services, appointments, business
from authenticator import authenticator
import os


app = FastAPI()

origins = [
    os.environ.get("CORS_HOST", None),
    "http://localhost:3000",
]

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(checklist.router)
app.include_router(services.router)
app.include_router(appointments.router)
app.include_router(business.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

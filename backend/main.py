from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes.tasks import router as task_router
from routes.auth import router as auth_router

app = FastAPI(title="Smart Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*", "OPTIONS"],
    allow_headers=["*"],
)

# @app.middleware("http")
# async def log_requests(request: Request, call_next):
#     print(f"Incoming request: {request.method} {request.url}")
#     print(f"Headers: {request.headers}")
#     response = await call_next(request)
#     return response


Base.metadata.create_all(bind=engine)

app.include_router(task_router)
app.include_router(auth_router)


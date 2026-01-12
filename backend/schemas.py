from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    start_date: datetime
    due_date: datetime
    progress: int = 0
    dependencies: List[str] = Field(default_factory=list)

    is_risk: bool = False
    risk_message: Optional[str] = None
    ai_suggestion: Optional[str] = None



class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        orm_mode = True

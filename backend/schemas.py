from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    start_date: datetime
    due_date: datetime
    progress: int = 0
    dependencies: List[str] = []

    is_risk: bool = False
    risk_message: Optional[str] = None
    ai_suggestion: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True

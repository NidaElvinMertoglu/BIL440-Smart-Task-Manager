from sqlalchemy import Column, Integer, String, DateTime, Boolean
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    priority = Column(String, nullable=False)  # low / medium / high

    start_date = Column(DateTime, nullable=False)
    due_date = Column(DateTime, nullable=False)

    progress = Column(Integer, default=0)

    # Task ID string 
    dependencies = Column(String, default="")

    # AI 
    is_risk = Column(Boolean, default=False)
    risk_message = Column(String, nullable=True)
    ai_suggestion = Column(String, nullable=True)

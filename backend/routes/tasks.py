from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Task, Base
from schemas import TaskCreate, Task as TaskSchema
from priority_engine import analyze_task_risk
from routes.auth import get_current_user
from models import User

Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[TaskSchema])
def get_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Task).filter(Task.owner_id == current_user.id).all()

@router.post("/", response_model=TaskSchema)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_task = Task(
        **task.dict(exclude={"dependencies"}),
        dependencies=",".join(task.dependencies),
        owner_id=current_user.id
    )

    is_risk, msg, suggestion = analyze_task_risk(db_task)
    db_task.is_risk = is_risk
    db_task.risk_message = msg
    db_task.ai_suggestion = suggestion

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/{task_id}", response_model=TaskSchema)
def get_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskSchema)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    for k, v in task.dict().items():
        if k == "dependencies":
            setattr(db_task, k, ",".join(v))
        else:
            setattr(db_task, k, v)

    is_risk, msg, suggestion = analyze_task_risk(db_task)
    db_task.is_risk = is_risk
    db_task.risk_message = msg
    db_task.ai_suggestion = suggestion

    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}
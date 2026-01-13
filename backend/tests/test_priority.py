from datetime import datetime, timedelta
from ..priority_engine import analyze_task_risk


class FakeTask:
    def __init__(self, due_date, progress):
        self.due_date = due_date
        self.progress = progress

def test_high_risk_task():
    task = FakeTask(datetime.now() + timedelta(days=1), 10)
    is_risk, _, _ = analyze_task_risk(task)
    assert is_risk is True

def test_past_due_date_task():
    task = FakeTask(datetime.now() - timedelta(days=1), 100)
    is_risk, _, _ = analyze_task_risk(task)

    # AI initially FAILED to consider overdue tasks
    assert is_risk is True


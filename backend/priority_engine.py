from datetime import datetime

def analyze_task_risk(task):
    now = datetime.now()
    days_left = (task.due_date - now).days

    if days_left < 0:
        return True, "Deadline passed", "Reschedule the task"

    if days_left <= 2 and task.progress < 50:
        return True, "High delay risk", "Increase priority or reduce scope"

    return False, None, None

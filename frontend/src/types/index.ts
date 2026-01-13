export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high';
  start_date: string; 
  due_date: string; 
  progress: number;
  dependencies: string[];
  is_risk: boolean;
  risk_message: string | null;
  ai_suggestion: string | null;
}

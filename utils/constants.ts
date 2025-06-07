export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100' },
  { value: 'review', label: 'Review', color: 'bg-yellow-100' },
  { value: 'done', label: 'Done', color: 'bg-green-100' },
  { value: 'blocked', label: 'Blocked', color: 'bg-red-100' }
] as const;

export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
] as const;

export const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'ui', label: 'UI/Figma' }
] as const;

export const STORAGE_KEYS = {
  PROJECTS: 'task-management-projects',
  CURRENT_PROJECT: 'task-management-current-project'
} as const;
export interface Task {
    id: string;
    title: string;
    description: string;
    assignee?: string;
    dueDate?: string;
    status: TaskStatus;
    priority?: TaskPriority;
    createdAt: string;
    updatedAt: string;
}

export interface Module {
    id: string;
    moduleName: string;
    moduleOwner?: string;
    tasks: Task[];
    createdAt: string;
}

export interface Category {
    modules: Module[];
}

export interface Project {
    id: string;
    projectName: string;
    projectDescription?: string;
    startDate?: string;
    endDate?: string;
    categories: {
        frontend: Category;
        backend: Category;
        ui: Category;
    };
    createdAt: string;
    updatedAt: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type CategoryType = 'frontend' | 'backend' | 'ui';

export interface FormState {
    isValid: boolean;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
}
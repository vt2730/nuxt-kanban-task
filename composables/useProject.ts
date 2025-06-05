import { v4 as uuidv4 } from 'uuid';
import type { Project, Module, Task, CategoryType } from '~/types';
import { STORAGE_KEYS } from '~/utils/constants';

export const useProject = () => {
  const { setItem, getItem } = useLocalStorage();
  
  const projects = ref<Project[]>([]);
  const currentProject = ref<Project | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadProjects = () => {
    try {
      loading.value = true;
      projects.value = getItem(STORAGE_KEYS.PROJECTS, []);
      const currentProjectId = getItem(STORAGE_KEYS.CURRENT_PROJECT, null);
      
      if (currentProjectId) {
        currentProject.value = projects.value.find(p => p.id === currentProjectId) || null;
      }
    } finally {
      loading.value = false;
    }
  };

  const saveProjects = () => {
    setItem(STORAGE_KEYS.PROJECTS, projects.value);
  };

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categories: {
        frontend: { modules: [] },
        backend: { modules: [] },
        ui: { modules: [] }
      }
    };

    projects.value.push(newProject);
    saveProjects();
    return newProject;
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    const index = projects.value.findIndex(p => p.id === projectId);
    if (index !== -1) {
      projects.value[index] = {
        ...projects.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveProjects();
    }
  };

  const deleteProject = (projectId: string) => {
    projects.value = projects.value.filter(p => p.id !== projectId);
    if (currentProject.value?.id === projectId) {
      currentProject.value = null;
      setItem(STORAGE_KEYS.CURRENT_PROJECT, null);
    }
    saveProjects();
  };

  const setCurrentProject = (projectId: string) => {
    const project = projects.value.find(p => p.id === projectId);
    if (project) {
      currentProject.value = project;
      setItem(STORAGE_KEYS.CURRENT_PROJECT, projectId);
    }
  };

  const addModule = (projectId: string, category: CategoryType, moduleData: Omit<Module, 'id' | 'createdAt'>) => {
    const project = projects.value.find(p => p.id === projectId);
    if (project) {
      const newModule: Module = {
        ...moduleData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        tasks: []
      };

      project.categories[category].modules.push(newModule);
      project.updatedAt = new Date().toISOString();
      saveProjects();
    }
  };

  const updateModule = (projectId: string, category: CategoryType, moduleId: string, updates: Partial<Module>) => {
    const project = projects.value.find(p => p.id === projectId);
    if (project) {
      const moduleIndex = project.categories[category].modules.findIndex(m => m.id === moduleId);
      if (moduleIndex !== -1) {
        project.categories[category].modules[moduleIndex] = {
          ...project.categories[category].modules[moduleIndex],
          ...updates
        };
        project.updatedAt = new Date().toISOString();
        saveProjects();
      }
    }
  };

  const deleteModule = (projectId: string, category: CategoryType, moduleId: string) => {
    const project = projects.value.find(p => p.id === projectId);
    if (project) {
      project.categories[category].modules = project.categories[category].modules.filter(m => m.id !== moduleId);
      project.updatedAt = new Date().toISOString();
      saveProjects();
    }
  };

  // Initialize on composable creation
  onMounted(() => {
    loadProjects();
  });

  return {
    projects: readonly(projects),
    currentProject: readonly(currentProject),
    loading: readonly(loading),
    error: readonly(error),
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
    setCurrentProject,
    addModule,
    updateModule,
    deleteModule
  };
};
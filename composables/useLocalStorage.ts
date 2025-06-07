export const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    if (process.client) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  };

  const getItem = <T>(key: string, defaultValue: T): T => {
    if (process.client) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const removeItem = (key: string) => {
    if (process.client) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  };

  return {
    setItem,
    getItem,
    removeItem
  };
};
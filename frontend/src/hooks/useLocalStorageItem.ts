/**
 * Get data from localStorage
 */
export function useLocalStorageItem<T>(key: string) {
  const item: string | null = localStorage.getItem(key);
  const data: T | null = item ? JSON.parse(item) : null;

  return data;
}

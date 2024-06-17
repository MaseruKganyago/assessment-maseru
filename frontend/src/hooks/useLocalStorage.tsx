import { useWebStorage } from './useWebStorage';

export function useLocalStorage<T>(key: string, initialValue: T = null): [T, (v: T) => void] {
  return useWebStorage('localStorage', key, initialValue);
}

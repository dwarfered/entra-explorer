// useDebounce.ts
import { useRef, useEffect, useCallback } from "react";

/**
 * Custom hook to debounce a function.
 * @param callback The function to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced function.
 */
function useDebounce(callback: (...args: string[]) => void, delay: number) {
  const timeoutRef = useRef<number | undefined>();

  const debouncedFunction = useCallback(
    (...args: string[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export default useDebounce;

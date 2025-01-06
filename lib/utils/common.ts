import { useEffect, useState } from "react";

export function useDebouncedValue(
    value: string,
    delay: number,
    minLength: number = 3
  ): string {
    const [debouncedValue, setDebouncedValue] = useState<string>("");
  
    useEffect(() => {
      if (value.length >= minLength) {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
  
        return () => {
          clearTimeout(handler);
        };
      } else {
        setDebouncedValue(""); // To reset when under minLength
      }
    }, [value, delay, minLength]);
  
    return debouncedValue;
  }
import { useState, useRef } from 'react';

export function useAsyncLock(asyncFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const isLocked = useRef(false);

  const execute = async (...args) => {
    
    if (isLocked.current) return;
    isLocked.current = true;
  
    setIsLoading(true);
    
    try {
      await asyncFunction(...args);
    } catch (error) {
      console.error(error);
    
      throw error;
    } finally {
      isLocked.current = false;
      setIsLoading(false);
    }
  };

  return [execute, isLoading];
}

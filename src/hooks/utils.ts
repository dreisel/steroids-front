import { useState } from 'react';

export function useSafeAsyncTaskWithLoading(): [boolean, (...args: any[]) => () => Promise<void>] {
  const [isLoading, setLoading] = useState<boolean>(false);

  function withSafeLoading(task: (...args: any[]) => Promise<void>): () => Promise<void> {
    return async (...args) => {
      if (isLoading) return;
      try {
        setLoading(true);
        await task(args);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
  }
  return [isLoading, withSafeLoading];
}

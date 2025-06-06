
import { useEffect } from 'react';

export const useAutoSlide = (api: any, delay: number = 3000) => {
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, delay);

    return () => clearInterval(interval);
  }, [api, delay]);
};

import { useEffect, useRef } from 'react';

export const useClockWorker = (listener: (e: MessageEvent) => void): void => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    import('../workers/clock-worker').then(({ worker }) => {
      workerRef.current = worker;
      worker.addEventListener('message', listener);
    });

    return () => {
      workerRef.current?.removeEventListener('message', listener);
    }
  }, [])
}
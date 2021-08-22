import { useEffect, useRef } from 'react';

export default <T>(event: string, cb: (data: T) => any): void => {
  const sseRef = useRef<EventSource | null>(null)

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const { data } = JSON.parse(event.data);
      cb(data);
    }

    import('../workers/event-source')
      .then(({ eventSource }) => {
        sseRef.current = eventSource;
        eventSource.addEventListener(event, listener as EventListener);
      })

    return () => {
      sseRef.current?.removeEventListener(event, listener as EventListener)
    }
  }, [])

}
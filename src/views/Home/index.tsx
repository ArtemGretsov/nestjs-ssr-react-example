import React, {useEffect, useState} from 'react';
import Temperature from './components/Temperature';

export default ({ temperatures }: any) => {
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const sse = new EventSource('/sse');
    setEventSource(sse);
  }, [])

  return (
    <div>
      <Temperature
        temperatures={temperatures}
        eventSource={eventSource}
      />
    </div>
  )
}


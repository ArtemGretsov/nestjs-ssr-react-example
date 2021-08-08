import React, {useEffect, useMemo, useRef, useState} from 'react';
import Card from '../../../components/Card';
import { SseNameEnum } from '../../../../enums/sse-name.enum';

export default ({
  temperatures: propsTemperatures,
  eventSource,
}: any) => {
  const temperaturesRef = useRef([]);
  const [stateTemperatures, setStateTemperatures] = useState(propsTemperatures);
  temperaturesRef.current = stateTemperatures;

  useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener(SseNameEnum.temperatures, (event: any) => {
        const { data } = JSON.parse(event.data);
        setStateTemperatures([
          data,
          ...temperaturesRef.current.slice(1),
        ]);
      });
    }
  }, [eventSource])

  useEffect(() => {
    const worker = new Worker('clock-worker.js');
    worker.onmessage = (event) => {
     console.log('e')
    };
  }, [])

  return (
    <Card
      title="Process Temperature"
      valueUnit="U+2103"
      lastValue={stateTemperatures[0]?.value}
      table={<div>table</div>}
    />
  )
}
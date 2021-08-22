import React, { useRef, useState } from 'react';
import { Card } from '../../../../components/card';
import { SseNameEnum } from '../../../../../server/enums/sse-name.enum';
import useEventSource from '../../../../hooks/use-event-source';
import { TemperatureTable } from "./components/table";
import { ITemperature } from '../../interfaces/temperature.interface';

interface IProps {
  data: ITemperature[];
}

export const Temperature: React.FC<IProps> = ({ data}) => {
  const temperaturesRef = useRef([] as ITemperature[]);
  const [stateTemperatures, setStateTemperatures] = useState(data);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(Date.now());
  temperaturesRef.current = stateTemperatures;

  useEventSource(SseNameEnum.temperatures, (temperature: ITemperature) => {
    setStateTemperatures([
      temperature,
      ...temperaturesRef.current.slice(0, temperaturesRef.current.length - 1),
    ]);
    setLastUpdatedTime(Date.now);
  });

  return (
    <Card
      title="Processor Temperature"
      valueUnit="C&deg;"
      value={stateTemperatures[0]?.value}
      criticalValue={80}
      table={<TemperatureTable data={stateTemperatures} />}
      lastUpdatedTime={lastUpdatedTime}
    />
  )
}
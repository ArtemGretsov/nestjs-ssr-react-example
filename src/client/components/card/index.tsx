import React, { useState } from 'react';
import { Card as SCard } from 'semantic-ui-react';
import block from 'bem-cn';
import LastUpdatedTime from '../last-updated-time';
import { useEffectExceptOnMount } from '../../hooks/use-effect-except-on-mount';
import './styles.scss';

const b = block('card');

interface IProps {
  title: string;
  table: React.ReactNode;
  value: string | number;
  valueUnit: string;
  lastUpdatedTime: number;
  criticalValue: number;
}

export const Card: React.FC<IProps> = ({
  title,
  table,
  value,
  valueUnit,
  lastUpdatedTime,
  criticalValue,
}) => {
  const [ blinker, setBlinker ] = useState(false);

  useEffectExceptOnMount(() => {
    setBlinker(true);
    setTimeout(() => {
      setBlinker(false);
    }, 1000)

  }, [value])

  const isCriticalTitle = value > criticalValue;

  return (
    <SCard className={b().toString()}>
      <SCard.Content className={b('title', { critical: isCriticalTitle }).toString()} header={title} />
      <SCard.Content className={b('current', { blinker }).toString()}>
        <p className={b('current-value').toString()}>
          {value}
        </p>
        <p>
          {valueUnit}
        </p>
      </SCard.Content>
      <SCard.Content>
        {table}
      </SCard.Content>
      <SCard.Content extra>
        <LastUpdatedTime last={lastUpdatedTime} />
      </SCard.Content>
    </SCard>
  )
}

import React from 'react';
import { Card as SCard } from 'semantic-ui-react';

interface IProps {
  title: string;
  table: any;
  lastValue: string | number;
  valueUnit: string;
}

export default ({
  title,
  table,
  lastValue,
  valueUnit
}: IProps) => (
  <SCard>
    <SCard.Content header={title} />
    <SCard.Content>
      <p>
        {lastValue}
      </p>
      <p>
        {valueUnit}
      </p>
    </SCard.Content>
    <SCard.Content extra>
      <p>Последнее обновление: </p>
      <p>3 секунды назад</p>
    </SCard.Content>
  </SCard>
)

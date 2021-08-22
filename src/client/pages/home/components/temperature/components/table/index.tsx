import React from 'react'
import { Table } from 'semantic-ui-react'
import { dateHelper } from '../../../../../../helpers/date';
import { ChangeOfValue } from '../../../../../../components/change-of-value';
import { ITemperature } from '../../../../interfaces/temperature.interface';

interface IProps {
  data: ITemperature[];
}

export const TemperatureTable: React.FC<IProps> = ({ data }) => {
  const getStateChangeOfValue = (index: number): number => {
    const prev = data[index + 1];

    if (!prev) {
      return 0;
    }

    return prev.value - data[index].value;
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Time</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Temperature</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Difference</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item: ITemperature, index: number) => {
          const diff = getStateChangeOfValue(index);

          return (
            <Table.Row key={item.id}>
              <Table.Cell textAlign="center">{dateHelper.toTime(item.dateCreate)}</Table.Cell>
              <Table.Cell textAlign="center">{item.value} C&deg;</Table.Cell>
              <Table.Cell textAlign="center">
                <ChangeOfValue isDown={diff >= 0} value={Math.abs(diff)} />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
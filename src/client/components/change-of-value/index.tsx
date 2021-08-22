import React from 'react';
import { Icon } from 'semantic-ui-react';
import { block } from 'bem-cn';
import './styles.scss';

const b = block('change-of-value');

interface IProps {
  isDown: boolean;
  value: number;
}

export const ChangeOfValue: React.FC<IProps> = ({ isDown, value }) => (
  <div className={b()}>
    {value}
    {isDown ?
      (
        <Icon
          name="long arrow alternate down"
          className={b('icon', { down: true }).toString()}
        />
      ) :
      (
        <Icon
          name="long arrow alternate up"
          className={b('icon', { up: true }).toString()}
        />
      )
    }
  </div>
)
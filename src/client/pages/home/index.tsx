import React from 'react';
import { Temperature } from './components/temperature';
import { block } from 'bem-cn';
import { ITemperature } from './interfaces/temperature.interface';
import './styles.scss';

const b = block('home-page');

interface IProps {
  temperatures: ITemperature[]
}

const Home: React.FC<IProps> = ({ temperatures }) => {
  return (
    <div className={b()}>
      <Temperature
        data={temperatures}
      />
    </div>
  )
}

export default Home;

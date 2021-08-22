import React, { useState } from 'react';
import { block } from 'bem-cn';
import { useClockWorker } from '../../hooks/use-clock-worker';
import './styles.scss';

const b = block('last-updated-time');

interface IProps {
  last: number;
}

const LastUpdatedTime: React.FC<IProps> = ({ last }) => {
  const [ currentTime, setCurrentTime ] = useState(Date.now());

  useClockWorker((e) => {
    setCurrentTime(e.data);
  })

  const seconds = Math.ceil((currentTime - last) / 1000);

  return (
    <div className={b()}>
      <p>{`Last update: ${seconds} sec. ago`}</p>
    </div>
  )
}

export default LastUpdatedTime;
import React, { useEffect } from 'react';
import { Head } from '@react-ssr/nestjs-express';
import { SseNameEnum } from '../enums/sse-name.enum';

interface IndexProps {
  message: string;
}

const Index = (props: IndexProps) => {
  useEffect(() => {
    const eventSource = new EventSource('/sse');

    eventSource.addEventListener(SseNameEnum.temperatures, (event) => {
      console.log(event)
    });
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>my-system-viewer app</title>
      </Head>
      <p>{props.message}</p>
      <a href="/about">Go to the about page</a>
    </React.Fragment>
  );
};

export default Index;

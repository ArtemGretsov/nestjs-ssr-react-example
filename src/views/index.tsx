import React, { useState } from 'react';
import { Head } from '@react-ssr/nestjs-express';

interface IndexProps {
  message: string;
}

const Index = (props: IndexProps) => {
  const [count, counter] = useState(0)

  return (
    <React.Fragment>
      <Head>
        <title>my-system-viewer app</title>
      </Head>
        <button onClick={() => counter((a) => ++a)}>click</button>
        <p>{count}</p>
      <p>{props.message}</p>
      <a href="/about">Go to the about page</a>
    </React.Fragment>
  );
};

export default Index;

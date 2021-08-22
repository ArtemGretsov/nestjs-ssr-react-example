import React from 'react';
import {
  Document,
  Head,
  Main,
} from '@react-ssr/nestjs-express';

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <title>react-ssr-nestjs-starter</title>
          <link rel="stylesheet" href="/static/styles/reset.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        </Head>
        <body>
          <Main />
        </body>
      </html>
    );
  }
};

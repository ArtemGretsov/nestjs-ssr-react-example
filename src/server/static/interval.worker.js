setInterval(() => {
  postMessage(Date.now(), 'http://localhost:3000');
}, 1000)
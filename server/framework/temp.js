import express from 'express';

import Express4Response from './response.js';

const app = express();

app.get('/', (req, res) => {
  const data = { message: 'Hello, world!' };
  res =  new Express4Response(data, 200, null, { 'X-Header': 'value' }, false, 'application/json');
});

app.listen(8001);
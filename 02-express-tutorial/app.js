const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('User hit the resource');
  res.status(200).send('Home page');
});

app.get('/about', (req, res) => {
  res.status(200).send('About page');
});

// To manually set the Content-Type header for res.send() responses, you can use the res.set() or res.setHeader() methods.
app.get('/api/data', (req, res) => {
  const data = 'Hello, world!';
  res.set('Content-Type', 'text/plain');
  res.send(data);
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

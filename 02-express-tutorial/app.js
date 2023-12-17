const express = require('express');
const app = express();
const morgan = require('morgan');

const logger = require('./logger');
const authorize = require('./authorize');
//  req => middleware => res
// app.use([logger, authorize]); // it will use for all the routes
// app.use('/api', logger); // it will use for all the routes that starts with /api
// app.use(express.static('./public'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Home');
});
app.get('/about', (req, res) => {
  //   console.log(req.user);
  res.send('About');
});
app.get('/api/products', (req, res) => {
  res.send('Products');
});
app.get('/api/items', (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

const http = require('http');

const server = http.createServer((req, res) => {
  //   res.writeHead(200, { 'content-type': 'text/html' });
  //   res.end('<h1>Home page</h1>');
  res.writeHead(200, { 'content-type': 'text/html' });
  //   res.writeHead(200, { 'content-type': 'text/plain' });
  res.write('<h1>Home page</h1>');
  res.end();
});

server.listen(5000);

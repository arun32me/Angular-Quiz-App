const express = require('express');

const server = express();

server.listen(3000, console.log('Server listening on port 3000'));

server.use(express.static('public'));

// server.get('/', function(req, res) {
//     console.log(req);
//     res.send('Hello World!');
// });
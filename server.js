const http = require('http');
const app = require('./index');
require('dotenv').config();

const port = process.env.APP_PORT || '9000';

// Create HTTP server.
const server = http.createServer(app);
server.listen(port);

console.log(`running on port: http://localhost:${port}`);
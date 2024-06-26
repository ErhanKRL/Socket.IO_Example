import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
  socket.on('hello', (arg) => {
    console.log(arg); // 'world'
  });
  socket.on('request', (arg1, arg2, cb) => {
    console.log(arg1, arg2);
    cb({ status: 'ok' });
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
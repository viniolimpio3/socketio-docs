import express from 'express';
import dotenv from 'dotenv';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, '../..', 'public');

app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(`Server running at ${process.env.HOST}:${port}`))

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('Um cliente se conectou')
})
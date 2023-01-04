import express from 'express';
import env from './config/env.js';
import url from 'url';
import path from 'path';
import http from 'http';
import db from './config/database.js';
import { Server } from 'socket.io';


db.on('error', console.log.bind(console, 'Database error'));
db.once('open', () => {
    console.log("Conexão com o mongoDB realizada com sucesso.");
});

const app = express();
const port = env.port || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, '../..', 'public');

app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(`Server running at ${process.env.HOST}:${port}`))

const io = new Server(httpServer);

export default io;
import express from 'express';
import cors from 'cors';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initGame } from './utils/initGame.js';
import mongoose from 'mongoose';
import apiRoutes from './routes/index.routes.js';

const app = express();

const PORT = 3000;
const ORIGIN = 'http://localhost:5173';

app.use(cors({
  origin: ORIGIN,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());

app.use('/api', apiRoutes);

MongoMemoryServer.create().then((mongoServer) => {
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri).then(() => {
        console.log('Connected to in-memory MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            initGame();
        });
    }).catch((err) => {
        console.error('Failed to connect to in-memory MongoDB', err);
    });
});
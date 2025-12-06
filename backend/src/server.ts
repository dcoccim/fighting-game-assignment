import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initGame } from './utils/initGame.js';
import mongoose from 'mongoose';

const app = express();

const PORT = 3000;

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
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import DayRouter from './routers/day.js';
import MonthRouter from './routers/month.js';

const app = express();

const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
})

const PORT = process.env.PORT || process.argv.includes('dev') ? 3001 : 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Old Client running on localhost:3001
// app.use(express.static('public'));

// New Client
if (!process.argv.includes('dev')) {
    app.use(express.static(path.join(__dirname, "./client/build")));
}

app.use(express.json());
app.use(cors());

/** Attach database so accesible to requests. */
app.use(async (req, res, next) => {
    req.db = await dbPromise;
    next();
});

app.use('/day', DayRouter);
app.use('/month', MonthRouter);

app.get('/all', async (req, res, next) => {
    const data = await req.db.all('SELECT * FROM "time";');
    res.status(200).send(data);
});

/** Start Server */
(async () => {
    const db = await dbPromise;

    await db.migrate();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`);
    })
})()

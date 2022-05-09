import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import DayRouter from './routers/day.js';
import MonthRouter from './routers/month.js';

const app = express();

const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
})

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.use(async (req, res, next) => {
    req.db = await dbPromise;
    req.data = await req.db.all('SELECT * FROM time;');
    next();
});

app.use('/day', DayRouter);
app.use('/month', MonthRouter);

app.get('/all', (req, res, next) => {
    res.status(200).send(req.data);
});

/** Start Server */
(async () => {
    const db = await dbPromise;

    await db.migrate();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`);
    })
})()

import express from 'express';

import data from './data.js';
import DayRouter from './routers/day.js';
import MonthRouter from './routers/month.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    req.data = data;
    next();
});

app.use('/day', DayRouter);
app.use('/month', MonthRouter);

app.get('/all', (req, res, next) => {
    res.status(200).send(req.data);
});

app.listen(PORT);
console.log(`Listening on port ${PORT}.`);

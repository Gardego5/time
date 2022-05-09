const express = require('express');

const { data } = require('./data.js');
const { DayRouter } = require('./routers/day.js');
const { MonthRouter } = require('./routers/month.js');

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

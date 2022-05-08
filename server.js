const express = require('express');

const { DayRouter } = require('./routers/day.js')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/day', DayRouter);

app.listen(PORT);
console.log(`Listening on port ${PORT}.`);

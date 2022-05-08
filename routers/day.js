const express = require('express');

const { data } = require('../data.js')
const { validateDate, cleanDay } = require('./utils.js')

const DayRouter = express.Router();

DayRouter.param('date', (req, res, next, id) => {
    const dayIndex = data.findIndex(day => day.date === id);
    if (dayIndex !== -1) {
        req.dayIndex = dayIndex;
        req.day = data[dayIndex];
        next();
    } else {
        res.status(404).send();
    }
});

const validate = (req, res, next) => {
    const day = req.body;
    if (validateDate(day.date)) {
        req.day = cleanDay(day);
        next();
    } else {
        res.status(400).send("Not a valid date.");
    }
}

DayRouter.get('/:date', (req, res, next) => {
    res.status(200).send(req.day);
});

DayRouter.get('/', (req, res, next) => {
    res.status(200).send(data);
});

DayRouter.put('/', validate, (req, res, next) => {
    if (data.findIndex(d => d.date === req.day.date) >= 0) {
        res.status(409).send("Day already exists.");
    } else {
        data.push(req.day);
        res.status(201).send(data[data.length - 1]);
    }
});

module.exports = { DayRouter };

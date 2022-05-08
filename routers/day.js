const express = require('express');

const { data } = require('../data.js')
const { validateDate, cleanDay } = require('./utils.js')

const DayRouter = express.Router();

DayRouter.param('date', (req, res, next, id) => {
    req.date = (new Date(id)).toJSON();
    if (req.date === null) {
        res.status(400).send("Not a valid day.");
    }
    req.dayIndex = data.findIndex(day => day.date === req.date);
    if (req.dayIndex !== -1) {
        req.day = data[req.dayIndex];
    }
    next();
});

const validate = (req, res, next) => {
    if (validateDate(req.day.date)) {
        req.day = cleanDay(req.day);
        next();
    } else {
        res.status(400).send("Not a valid day object.");
    }
};

DayRouter.get('/:date', (req, res, next) => {
    if (req.day !== null) {
        res.status(200).send(req.day);
    } else {
        res.status(404).send("No entry for that day.");
    }
});

DayRouter.get('/', (req, res, next) => {
    res.status(200).send(data);
});

DayRouter.get('/ofMonth/:date', (req, res, next) => {
    const month = (new Date(req.date)).getMonth();
    const year = (new Date(req.date)).getFullYear();
    selectedData = data.filter(day => (new Date(day.date)).getMonth() === month && (new Date(day.date)).getFullYear() === year )
    if (selectedData.length > 0) {
        res.status(200).send(selectedData);
    } else {
        res.status(404).send("No entries in that month.");
    }
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

const express = require('express');

const middleware = require('./modules/middleware.js');

const DayRouter = express.Router({mergeParams: true});

DayRouter.param('date', (req, res, next, id) => {
    req.date = (new Date(id)).toJSON();
    if (req.date === null) {
        res.status(400).send("Not a valid day.");
    }
    req.dayIndex = req.data.findIndex(day => day.date === req.date);
    if (req.dayIndex !== -1) {
        req.day = req.data[req.dayIndex];
    }
    next();
});

DayRouter.get('/:date', (req, res, next) => {
    if (req.day) {
        res.status(200).send(req.day);
    } else {
        res.status(404).send("No entry for that day.");
    }
});

DayRouter.put('/', middleware.validate, (req, res, next) => {
    if (req.data.findIndex(d => d.date === req.day.date) >= 0) {
        res.status(409).send("Day already exists.");
    } else {
        req.data.push(req.day);
        res.status(201).send(req.data[req.data.length - 1]);
    }
});

module.exports = { DayRouter };

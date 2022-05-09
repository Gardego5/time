import express from 'express';

import { zerod } from './modules/utils.js';
import middleware from './modules/middleware.js';

const MonthRouter = express.Router({mergeParams: true});

MonthRouter.param('date', (req, res, next, id) => {
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

MonthRouter.param('date', middleware.selectMonth);

MonthRouter.get('/:date', (req, res, next) => {
    if (req.month.length > 0) {
        res.status(200).send(req.month);
    } else {
        res.status(404).send("No entries in that month.");
    }
});

MonthRouter.get('/:date/total/', (req, res, next) => {
    const zero = { hours: 0, placements: 0, videos: 0, "return visits": 0, studies: 0 };

    if (req.month.length > 0) {
        const total = req.month.reduce((summedDays, day) => {
            return {
                hours: summedDays.hours + zerod(day.hours),
                placements: summedDays.placements + zerod(day.placements),
                videos: summedDays.videos + zerod(day.videos),
                "return visits": summedDays["return visits"] + zerod(day["return visits"]),
                studies: summedDays.studies + zerod(day.studies),
            }
        }, zero);

        res.status(200).send(total);
    } else {
        res.status(200).send(zero);
    }
});

export default MonthRouter;

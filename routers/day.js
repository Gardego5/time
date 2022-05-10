import express from 'express';

import middleware from './modules/middleware.js';
import utils from './modules/utils.js';

const DayRouter = express.Router({mergeParams: true});

DayRouter.param('date', async (req, res, next, id) => {
    req.date = (new Date(id)).toJSON();
    if (req.date === null) {
        res.status(400).send("Not a valid day.");
    }
    req.day = await req.db.get(`SELECT * FROM "time" WHERE "date" = ?;`, [req.date]);

    next();
});

DayRouter.get('/:date', (req, res, next) => {
    if (req.day) {
        res.status(200).send(req.day);
    } else {
        res.status(404).send("No entry for that day.");
    }
});

DayRouter.put('/:date', async (req, res, next) => {
    req.day = utils.cleanDay(req.body);

    const currentValue = await req.db.get(`SELECT * FROM "time" WHERE "date" = ?;`, [req.date]);

    if (currentValue) {
        for (let property of Object.getOwnPropertyNames(currentValue)) {
            req.day[property] = req.day.hasOwnProperty(property) ? req.day[property] : currentValue[property];
        }
    } else {
        res.status(404).send("No entry for that day.");
        return;
    }

    await req.db.run(`
        UPDATE "time"
        SET
            "hours" = ?,
            "placements" = ?,
            "videos" = ?,
            "return visits" = ?,
            "studies" = ?
        WHERE "date" = ?;
    `, [req.day.hours, req.day.placements, req.day.videos, req.day["return visits"], req.day.studies, req.date]);

    const entry = await req.db.get('SELECT * FROM "time" WHERE "date" = ?;', [req.date]);
    res.status(200).send(entry);
});

DayRouter.post('/', middleware.validate, async (req, res, next) => {
    const currentValue = await req.db.get(`SELECT * FROM "time" WHERE "date" = ?;`, [req.day.date]);

    if (currentValue) {
        res.status(409).send("Day already exists.");
    } else {
        await req.db.run(`
            INSERT INTO "time" ("date", "hours", "placements", "videos", "return visits", "studies")
            VALUES (?, ?, ?, ?, ?, ?);
        `, [req.day.date, req.day.hours, req.day.placements, req.day.videos, req.day["return visits"], req.day.studies]);

        const entry = await req.db.get('SELECT * FROM "time" WHERE "date" = ?;', [req.day.date]);
        res.status(201).send(entry);
    }
});

export default DayRouter;

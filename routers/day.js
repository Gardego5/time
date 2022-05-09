import express from 'express';

import middleware from './modules/middleware.js';

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

DayRouter.put('/', middleware.validate, async (req, res, next) => {
    const currentValue = await req.db.get(`SELECT * FROM "time" WHERE "date" = ?;`, [req.day.date])

    if (currentValue) {
        res.status(409).send("Day already exists.");
    } else {
        await req.db.run(`
            INSERT INTO "time" ("date", "hours", "placements", "videos", "return visits", "studies")
            VALUES (?, ?, ?, ?, ?, ?);
        `, Object.values(req.day));

        const entry = await req.db.get('SELECT * FROM "time" ORDER BY "id" DESC LIMIT 1;');
        res.status(201).send(entry);
    }
});

export default DayRouter;

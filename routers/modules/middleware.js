import { validateDate, cleanDay } from './utils.js';

export const validate = (req, res, next) => {
    if (validateDate(req.body.date)) {
        req.day = cleanDay(req.body);
        next();
    } else {
        res.status(400).send("Not a valid day object.");
    }
};

export const selectMonth = async (req, res, next) => {
    req.month = await req.db.all(`
        SELECT * FROM "time" 
        WHERE strftime('%Y-%m', "date") = strftime('%Y-%m', ?);`
    , [req.date]);
    next();
};

export default { validate, selectMonth };

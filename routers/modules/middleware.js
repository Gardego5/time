import { validateDate, cleanDay } from './utils.js';

const validate = (req, res, next) => {
    if (validateDate(req.body.date)) {
        req.day = cleanDay(req.body);
        next();
    } else {
        res.status(400).send("Not a valid day object.");
    }
};

const selectMonth = (req, res, next) => {
    const month = (new Date(req.date)).getMonth();
    const year = (new Date(req.date)).getFullYear();
    req.month = req.data.filter(day => (new Date(day.date)).getMonth() === month && (new Date(day.date)).getFullYear() === year );
    next();
};

export default { validate, selectMonth };

const validateDate = dateStr => {
    const date = new Date(dateStr);
    return (
        date.toJSON() &&
        !date.getHours() &&
        !date.getMinutes() &&
        !date.getSeconds()
    );
};

const cleanDate = dateStr => (new Date(dateStr)).toJSON();

const cleanDay = day => {
    day.date = cleanDate(day.date);
    Object.getOwnPropertyNames(day)
        .forEach(prop => {
            if (!['date', 'hours', 'placements', 'videos', 'return visits', 'studies'].includes(prop)) {
                delete day[prop];
            }
        });
    return day;
}

module.exports = {
    validateDate,
    cleanDay
};
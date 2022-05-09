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
    day = {
        "date": day.date,
        "hours": day["hours"] ? day["hours"] : null,
        "placements": day["placements"] ? day["placements"] : null,
        "videos": day["videos"] ? day["videos"] : null,
        "return visits": day["return visits"] ? day["return visits"] : null,
        "studies": day["studies"] ? day["studies"] : null
    }
    return day;
}

const zerod = num => num ? num : 0;

export { validateDate, cleanDay, zerod };
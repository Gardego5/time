import { generateDayDiv } from "./modules/generators.js";
import { daysInMonth } from "./modules/utils.js";

/** Getting Main Elements */
const mainCalendar = document.getElementById('main-calendar');
const monthTitle = document.getElementById('month').children[0];
const stats = document.getElementById('stats');
const statFields = {
    hours: document.getElementById('hours'),
    placements: document.getElementById('placements'),
    videos: document.getElementById('videos'),
    "return visits": document.getElementById('rvs'),
    studies: document.getElementById('studies'),
};

const currentDate = new Date();
let currentMonth = daysInMonth(currentDate);
const calendarMonthOffset = (new Date(currentMonth[0].date)).getDay();
const calendarMonthFiller = 7 - (currentMonth.length + calendarMonthOffset) % 7;

let monthData = await fetch(`/month/${currentDate}`);
if (monthData.ok) {
    monthData = await monthData.json();
    currentMonth = currentMonth.map(day => {
        const dayWithData = monthData.find(data => data.date === day.date);
        return dayWithData ? dayWithData : day;
    })
}

monthTitle.textContent = String(currentDate).split(' ')[1];

/** Add Calendar Days */
for (let i = 0; i < calendarMonthOffset; i++) {
    mainCalendar.appendChild(Object.assign(document.createElement('div'), { className: 'day' }));
}
for (let day of currentMonth) {
    mainCalendar.appendChild(generateDayDiv(day));
}
for (let i = 0; i < calendarMonthFiller ; i++) {
    mainCalendar.appendChild(Object.assign(document.createElement('div'), { className: 'day' }));
}

let totalsData = await fetch(`/month/${currentDate}/total`);
if (totalsData.ok) {
    totalsData = await totalsData.json();
    for (let field of Object.getOwnPropertyNames(statFields)) {
        statFields[field].textContent = `${field}: ${totalsData[field]}`
    }
}

/** Move Info Box to bottom */
mainCalendar.appendChild(stats);

import { generateDayDiv } from "./modules/generators.js";
import { daysInMonth } from "./modules/utils.js";

/* Getting Main Elements */
const mainCalendar = document.getElementById('main-calendar');
const monthTitle = document.getElementById('month').children[0];

const currentDate = new Date();
const currentMonth = daysInMonth(currentDate);
const calendarMonthOffset = currentMonth[0].getDay();

monthTitle.textContent = String(currentDate).split(' ')[1];

/* Add Calendar Days */
for (let i = 0; i < calendarMonthOffset; i++) {
    mainCalendar.appendChild(Object.assign(document.createElement('div'), { className: 'day' }));
}
for (let day of currentMonth) {
    mainCalendar.appendChild(generateDayDiv(day));
}
for (let i = 0; i < (currentMonth.length - calendarMonthOffset + 1) % 7; i++) {
    mainCalendar.appendChild(Object.assign(document.createElement('div'), { className: 'day' }));
}
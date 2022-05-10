import { generateCalendar } from "./modules/generators.js";

const main = document.getElementsByTagName('main')[0];

const calendar = await generateCalendar(Date());

main.appendChild(calendar);

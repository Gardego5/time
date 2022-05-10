import { dayInnerElements, getDayNum } from "./utils.js";

export function generateEditor(day) {
    let tag = Object.assign(document.createElement('div'), {
        className: 'day editor',
        date: day.date,
        day: day,
        onclick: function(event) {
        }
    });

    dayInnerElements(day, true).forEach(subTag => {
        tag.appendChild(subTag);
    })

    return tag;
}

export function generateDayDiv(day) {
    let tag = Object.assign(document.createElement('div'), {
        className: 'day',
        date: day.date,
        day: day,
        onclick: function(event) {
        }
    });

    /** List of elements to add to tag. */
    dayInnerElements(day).forEach(subTag => {
        tag.appendChild(subTag);
    })

    return tag;
}

import { dayInnerElements, daysInMonth, getPreviousMonth, getNextMonth } from "./utils.js";

export function generateDayDiv(day) {
    let tag = Object.assign(document.createElement('div'), {
        className: 'day',
        date: day.date,
        day: day,
        selectedToEdit: false,
        onclick: function(event) {
            if (!this.selectedToEdit) {
                this.toggleEdit();
            }
        },
        toggleEdit: function() {
            if (this.selectedToEdit) {
                /** Weird thing, you must run in setTimeout, otherwise
                 *  you end up retriggering the dayDiv's onclick method
                 *  immediately, making it retoggle and not work as
                 *  expected.
                 */
                setTimeout(() => {
                    this.selectedToEdit = false;
                })
                for (let subTag of this.children) {
                    subTag.style.display = "";
                }
            } else {
                this.selectedToEdit = true;
                for (let subTag of this.children) {
                    switch(subTag.className) {
                        case "data":
                        case "endEdit":
                            subTag.style.display = "block";
                            break;
                        case "display":
                            subTag.style.display = "none";
                            break;
                    }
                }
            }
        },
        updateData: async function() {
            // Requests new day data from server
            let dayData = await fetch(`/day/${this.date}`);
            if (dayData.status === 200) {
                dayData = await dayData.json();
                
                this.day = dayData;

                // Empty the div.day while it still has things in it.
                while (this.firstChild) this.removeChild(this.firstChild);

                dayInnerElements(this.day).forEach(subTag => { this.appendChild(subTag); });
            } else {
                dayInnerElements(this.day).forEach(subTag => { this.appendChild(subTag); });
            }
        }
    });

    tag.updateData();

    return tag;
}

async function generateCalendarEntries(month) {
    const currentDate = new Date(month);

    // Gets an array of objects with date recorded.
    let currentMonth = daysInMonth(currentDate);

    console.log(month);
    // Updates array with monthData, fetched from server.
    let monthData = await fetch(`/month/${currentDate}`);
    if (monthData.ok) {
        monthData = await monthData.json();
        // Replace day objects with only date with data if recieved.
        currentMonth = currentMonth.map(day => {
            const dayWithData = monthData.find(data => data.date === day.date);
            return dayWithData ? dayWithData : day;
        })
    }

    // Used later to lay out calendar.
    const calendarMonthOffset = (new Date(currentMonth[0].date)).getDay();
    const calendarMonthFiller = 7 - (currentMonth.length + calendarMonthOffset) % 7;

    const childElements = [];

    // Add Arrows
    let leftarrow = Object.assign(document.createElement('div'), { className: 'left-arrow' });
    let rightarrow = Object.assign(document.createElement('div'), { className: 'right-arrow' });
    leftarrow.appendChild(Object.assign(document.createElement('button'), {
        className: 'arrow',
        textContent: '<',
        onclick: function() { this.parentElement.parentElement.newCalendar(getPreviousMonth(currentDate)); }
    }));
    rightarrow.appendChild(Object.assign(document.createElement('button'), {
        className: 'arrow',
        textContent: '>',
        onclick: function() { this.parentElement.parentElement.newCalendar(getNextMonth(currentDate)); }
    }));
    childElements.push(leftarrow, rightarrow);

    // Add Headings
    childElements.push(Object.assign(document.createElement('div'), {
        className: 'month',
        textContent: String(currentDate).split(' ')[1],
    }));
    for (let weekDay of ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) {
        childElements.push(Object.assign(document.createElement('div'), {
            className: 'day-column',
            textContent: weekDay,
        }));
    }

    // Add Calendar Days
    for (let i = 0; i < calendarMonthOffset; i++) {
        childElements.push(Object.assign(document.createElement('div'), { className: 'day' }));
    }
    for (let day of currentMonth) {
        childElements.push(generateDayDiv(day));
    }
    for (let i = 0; i < calendarMonthFiller ; i++) {
        childElements.push(Object.assign(document.createElement('div'), { className: 'day' }));
    }

    // Add Totals
    const totals = Object.assign(document.createElement('div'), {
        className: 'stats',
        updateData: async function() {
            // Empty the div.stats while it still has thing in it.
            while (this.firstChild) this.removeChild(this.firstChild);

            // Requests new totals data from server
            let totalData = await fetch(`/month/${currentDate.toJSON()}/total`);
            if (totalData.status === 200) {
                totalData = await totalData.json();

                for (let field of ['hours', 'placements', 'videos', 'return visits', 'studies']) {
                    totals.appendChild(Object.assign(document.createElement('p'), {
                        className: 'stat',
                        textContent: `${field.slice(0, 1).toUpperCase() + field.slice(1)}: ${totalData[field]}`,
                    }));
                }
            }
        },
    });

    totals.updateData();

    childElements.push(totals);

    console.log(childElements)
    return childElements;
}

export async function generateCalendar(month) {
    // Create main element and array to add as children.
    const calendarElement = Object.assign(document.createElement('div'), {
        className: 'calendar-box',
        id: `calendar-${month}`,
        newCalendar: async function(month) {
            while (this.firstChild) this.removeChild(this.firstChild);
            const childElements = await generateCalendarEntries(month);

            // Add all elements to calendar element and return it.
            for (let child of childElements) calendarElement.appendChild(child);
        }
    });

    calendarElement.newCalendar(month);

    return calendarElement;
}

import { dayInnerElements, daysInMonth } from "./utils.js";

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

export async function generateCalendar(month) {
    const currentDate = new Date(month);

    // Gets an array of objects with date recorded.
    let currentMonth = daysInMonth(currentDate);

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


    // Create main element and array to add as children.
    const calendarElement = Object.assign(document.createElement('div'), {
        className: 'calendar-box',
        id: `calendar-${month}`,
    });
    const childElements = [];

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


    // Add all elements to calendar element and return it.
    for (let child of childElements) calendarElement.appendChild(child);
    return calendarElement;
}

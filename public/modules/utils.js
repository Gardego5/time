export const daysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear(); 
    return Array.from(
        { length: new Date(year, month + 1, 0).getDate() },
        (_, i) => {
            return {date: (new Date(year, month, i + 1)).toJSON()}
        }
    )
}

const nulledIfEmpty = str => {
    if (str.length === 0) {
        return null;
    } else {
        return Number(str);
    }
}

export const dayInnerElements = (day, editor = false) => {
    const dayNum = getDayNum(day);
    const innerElements = [
        Object.assign(document.createElement('p'), {
            textContent: `${dayNum}`,
            className: 'day-number',
        }),
    ].concat(['hours', 'placements', 'videos', 'return visits', 'studies'].flatMap(field => [
        Object.assign(document.createElement('p'), {
            textContent: `${field}:`,
            className: 'label',
        }),
        Object.assign(document.createElement("input"), {
            value: `${day[field] ? day[field] : ''}`,
            className: 'data',
            id: `${field.replace(/ /g, "_")}_data_${dayNum}`,
        }),
        Object.assign(document.createElement("p"), {
            textContent: `${day[field] ? day[field] : ''}`,
            className: 'display',
            id: `${field.replace(/ /g, "_")}_data_display_${dayNum}`,
        }),
    ]));

    // End Edit Button
    innerElements.splice(13, 0, Object.assign(document.createElement("button"), {
        textContent: "✓",
        className: 'endEdit',
        onclick: async function(event) {
            const data = {
                hours: nulledIfEmpty(document.getElementById(`hours_data_${dayNum}`).value),
                placements: nulledIfEmpty(document.getElementById(`placements_data_${dayNum}`).value),
                videos: nulledIfEmpty(document.getElementById(`videos_data_${dayNum}`).value),
                "return visits": nulledIfEmpty(document.getElementById(`return_visits_data_${dayNum}`).value),
                studies: nulledIfEmpty(document.getElementById(`studies_data_${dayNum}`).value),
            };

            const req = await fetch(`/day/${this.parentElement.day.date}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Change back to normal mode and update data displayed.
            this.parentElement.toggleEdit();
            this.parentElement.updateData();
            // Update the Calendar's Totals Statistics.
            this.parentElement.parentElement.getElementsByClassName("stats")[0].updateData();
        }
    }));

    return innerElements;
}

export const getDayNum = day => (new Date(day.date)).getDate();

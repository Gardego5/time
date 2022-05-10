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

    innerElements.splice(13, 0, Object.assign(document.createElement("button"), {
        textContent: "✓",
        className: 'endEdit',
        onclick: function(event) {
            this.parentElement.toggleEdit();
        }
    }));
    /*
    if (editor) {
        innerElements.splice(9, 0, Object.assign(document.createElement("button", {

        })));
        innerElements[10].style.gridColumn = "2";
    }
    */

    return innerElements;
}

export const getDayNum = day => (new Date(day.date)).getDate();

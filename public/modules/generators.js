export function generateDayDiv(day) {
    const dayNum = (new Date(day.date)).getDate();

    let tag = Object.assign(document.createElement('div'), {
        className: 'day',
        date: day.date,
        onclick: function (event) {
            /** Get day info */
        }
    });

    /** List of elements to add to tag. */
    [
        Object.assign(document.createElement('p'), {
            textContent: `${dayNum}`,
            className: 'day-number',
        }),
        Object.assign(document.createElement('p'), {
            textContent: 'hours:',
            className: 'first-label',
        }),
        Object.assign(document.createElement('p'), {
            textContent: `${day.hours ? day.hours : ''}`,
            className: 'data',
            id: `_${dayNum}_hours_data`,
        }),
    ].concat(['placements', 'videos', 'return visits', 'studies'].flatMap(field => [
        Object.assign(document.createElement('p'), {
            textContent: `${field}:`,
            className: 'label',
        }),
        Object.assign(document.createElement('p'), {
            textContent: `${day[field] ? day[field] : ''}`,
            className: 'data',
            id: `_${dayNum}_${field}_data`,
        }),
    ])).forEach(subTag => {
        tag.appendChild(subTag);
    })

    return tag;
}

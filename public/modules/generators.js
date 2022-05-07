export function generateDayDiv(date) {
    const dayNum = date.getDate();

    let tag = Object.assign(document.createElement('div'), {
        className: 'day',
        dateValue: Date()
    });

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
            className: 'data',
            id: `_${dayNum}_hours_data`,
        }),
    ].concat(['placement', 'videos', 'return visits', 'studies'].flatMap(field => [
        Object.assign(document.createElement('p'), {
            textContent: `${field}:`,
            className: 'label',
        }),
        Object.assign(document.createElement('p'), {
            className: 'data',
            id: `_${dayNum}_${field}_data`,
        }),
    ])).forEach(subTag => {
        tag.appendChild(subTag);
    })

    return tag;
}

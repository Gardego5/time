
/* Getting Main Elements */
const mainCalendar = document.getElementById('main-calendar');
const monthTitle = document.getElementById('month').children[0];

function createDayDiv(dayNum) {
    let tag = Object.assign(document.createElement('div'), {
        className: 'day',
    });

    [
        Object.assign(document.createElement('p'), {
            textContent: `${dayNum}`,
            className: 'day-number',
        }),
        Object.assign(document.createElement('label'), {
            textContent: 'hours:',
            className: 'hours',
            htmlFor: `_${dayNum}_hours`,
        }),
        Object.assign(document.createElement('input'), {
            className: 'hours field',
            id: `_${dayNum}_hours`,
            type: 'number',
        }),
        Object.assign(document.createElement('label'), {
            textContent: 'placements:',
            className: 'placements',
            htmlFor: `_${dayNum}_placements`,
        }),
        Object.assign(document.createElement('input'), {
            className: 'placements field',
            id: `_${dayNum}_placements`,
            type: 'number',
        }),
        Object.assign(document.createElement('input'), {
            className: 'extra-info',
            type: 'button',
        }),
        Object.assign(document.createElement('label'), {
            textContent: 'rvs:',
            className: 'rvs',
            htmlFor: `_${dayNum}_rvs`,
        }),
        Object.assign(document.createElement('input'), {
            className: 'rvs field',
            id: `_${dayNum}_rvs`,
            type: 'number',
        })
    ].forEach(subTag => {
        tag.appendChild(subTag);
    })

    return tag;
}

for (let i = 1; i < 30; i++) {
    const newDayDiv = createDayDiv(i);
    mainCalendar.appendChild(newDayDiv);
}
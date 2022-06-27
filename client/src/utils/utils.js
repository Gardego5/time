export const daysInMonth = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear(); 
    return Array.from(
        { length: new Date(year, month + 1, 0).getDate() },
        (_, i) => {
            return {date: new Date(year, month, i + 1)}
        }
    )
}

export const getPreviousMonth = date => new Date(date.getFullYear(), date.getMonth() - 1, 1);


export const getNextMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 1);

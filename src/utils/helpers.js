export const getShortDateString = date => date && !isNaN(date.getTime()) ? date.toISOString().slice(0,10) : undefined;

export const addZeroToStart = str => !str ? undefined : +str > 9 ? str : '0'+(+str);

export const getDateString = (year, month, day) => `${year}-${addZeroToStart(month)}-${addZeroToStart(day)}`;

export const getNextMonthYear = (month, year) => (+month < 1 || +month > 12 || !month || !year) ? 
                                                undefined :  +month === 12 ? { month: 1, year: +year + 1 } : 
                                                { month: +month + 1, year };

export const getPrevMonthYear = (month, year) => (+month < 1 || +month > 12 || !month || !year) ? 
                                                undefined :  +month === 1 ? { month: 12, year: +year - 1 } : 
                                                { month: +month -1 , year };

export const getFullDateByLocale = (dateObj, locale='en') => {
    if ( !dateObj || isNaN(dateObj.getTime())) return undefined;  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(locale, options)
}
//  getting weekday names for tabe header
export const getWeekdaysByLocale = (week, month, year, locale='en') => {
    if (!week || week.length !== 7 || !month || !year) return [];
    const weekdays = [];
    for (let i=0; i < week.length; i++) {
        const date = new Date(`${year}-${month}-${week[i]}`);
        weekdays.push(date.toLocaleDateString(locale, { weekday: 'short'}))
    }
    return weekdays;
}

export const getMonthByLocale = (month, year, locale='en') => {
    if (!month || !year) return undefined;
    const dateObj = new Date(`${year}-${month}-01`);
    return dateObj.toLocaleDateString(locale, { month: 'long'})
}

export const getDaysInMonth = (month, year) => (!month || +month < 0 || +month > 12 || !year ) ? undefined : new Date(year, month, 0).getDate();

export const getDaysArray = (month, year) => {
    if ((!month || +month < 0 || +month > 12 || !year )) return [];
    const { month: prevMonth, year: prevYear } = getPrevMonthYear(month, year);
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear) // getDaysInMonth(month-1, year);
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayWeekday = new Date(`${year}-${month}-01`).getDay();
    const lastDayWeekday = new Date(`${year}-${month}-${daysInMonth.toString()}`).getDay();
    const daysArray = [];
    for (let d=1; d <= daysInMonth; d++) {
        daysArray.push(d)
    }
    if (firstDayWeekday > 1 || firstDayWeekday === 0) {
        const diff = firstDayWeekday === 0 ? 6 : firstDayWeekday-1;
        for (let d=daysInPrevMonth; d >daysInPrevMonth-diff; d--) {
            daysArray.unshift(d)
        }
    }
    if (lastDayWeekday !== 0) {
        const diff = 7 - lastDayWeekday;
        for (let d=1; d <=diff; d++) {
            daysArray.push(d)
        }
    }
    return daysArray;
}

export const getMonthMatrix = (arr) => {
    if (!arr || arr.length < 28 || arr.length%7 > 0) return []
    const matrix = [];
    
    for (let i = 0; i < arr.length; i += 7) {
        const chunk = arr.slice(i, i+7);
        matrix.push(chunk);
    }

    return matrix;
}


export const getMonthsToRender = (currentMonth, currentYear, monthsToRender) => {
    if (!currentMonth || +currentMonth < 0 || +currentMonth > 12 ||
         !currentYear || !monthsToRender || typeof monthsToRender !== 'number') return [];

    const monthsArr = [{ month: +currentMonth, year: +currentYear}];
    let nextMonth = +currentMonth;
    let nextYear = +currentYear
    let i=1;
    while( i < monthsToRender ) {
        const { month, year } = getNextMonthYear(nextMonth, nextYear);
        monthsArr.push({month, year});
        nextMonth = month;
        nextYear = year;
        i++;
    }
    return monthsArr
};

export const isWeekend = (dateString) => (new Date(dateString)).getDay() === 0 || (new Date(dateString)).getDay() === 6 ? true : false;
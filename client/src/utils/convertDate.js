function addHours(date, hours) {
    const dateCopy = new Date(date);
  
    dateCopy.setHours(dateCopy.getHours() + hours);
  
    return dateCopy;
}

export const convertDateFromISO = (ISODate) => {
    const months = {
        "Jan": "Январь",
        "Feb": "Февраль",
        "Mar": "Март",
        "Apr": "Апрель",
        "May": "Май",
        "Jun": "Июнь",
        "Jul": "Июль",
        "Aug": "Август",
        "Sep": "Сентябрь",
        "Oct": "Октябрь",
        "Nov": "Ноябрь",
        "Dec": "Декабрь"
    }

    const date = String(new Date(ISODate));
    const arrDate = date.split(" ");

    return arrDate[2] + " " + months[arrDate[1]] + " " + arrDate[3] + " " + arrDate[4];
}

export const convertDateToISO = (formatDate) => {
    const months = {
        "Январь": "Jan",
        "Февраль": "Feb",
        "Март": "Mar",
        "Апрель": "Apr",
        "Май": "May",
        "Июнь": "Jun",
        "Июль": "Jul",
        "Август": "Aug",
        "Сентябрь": "Sep",
        "Октябрь": "Oct",
        "Ноябрь": "Nov",
        "Декабрь": "Dec",
    }

    const arrDate = formatDate.split(" ");
    arrDate[1] = months[arrDate[1]];

    const date = new Date(arrDate.join(" "));
    const newDate = addHours(date, 3)

    return newDate.toISOString();
}
const toUTCFull = (date) => {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
};

const toUTCDayStart = (date) => {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

const toUTCDayEnd = (date) => {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};

module.exports = { 
    toUTCFull, 
    toUTCDayStart, 
    toUTCDayEnd 
};
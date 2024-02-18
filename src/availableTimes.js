/* public */
export { fetchTimes, submitReservation, getISODate };

/* testing */
export { enumerateTimeSlots, getTimeSlots };

/** Cache the output of a function based on its input.
 * The input can be transformed to create collisions
 */
const memoize = (f, transform = x => x) => {
    const cache = new Map();
    return input => {
        const key = transform(input);
        if(cache.has(key)) return cache.get(key);
        else {
            const output = f(input);
            cache.set(key, output);
            return output;
        }
    }
}

/* fake data */
const openingHour = 12;
const closingHour = 22;

/** Fake random predicate always accepting the last available time slot */
const isValidTime = (_, i, a) => Math.random() > 0.5 || i === a.length - 1;

/** Get the date in format YYY-MM-DD from a Date object */
const getISODate = (date) => date.toISOString().slice(0, 10);

/** List every possible time slot from `start` and `end` opening hours */
const enumerateTimeSlots = (opening, closing) => {
    return Array.from(
        { length: closing - opening },
        (_, i) => String(opening + i + 1).padStart(2, '0') + ':00'
    );
};

/** Return random time slots until `end` */
const getTimeSlots = (opening, closing) => date => {
    const start = date.getHours();
    const times = enumerateTimeSlots(Math.max(opening, start), closing);
    return times.filter(isValidTime);
};

/** API returning consistent random time slots until closingHour. */
const fetchTimes = memoize(date => {
    const times = getTimeSlots(openingHour, closingHour)(date);
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(times), 500);
    });
}, getISODate);

/** Resolve to `true` 2/3 of the time */
const submitReservation = () => Promise.resolve(Math.random() < 2/3);
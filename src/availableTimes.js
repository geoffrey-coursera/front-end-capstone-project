/* public */
export { fetchAPI, submitAPI, getISODate };

/* testing */
export { fromOpeningHours, fromDate };

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
const fromOpeningHours = end => start => {
    return Array.from(
        {length: end - start},
        (_, i) => String(start + i + 1).padStart(2, '0') + ':00'
    );
};

/** API returning consistent random time slots. */
const fetchAPI = (date, sync=false) => {
    const times = getTimeSlots(date);
    return sync ? times : Promise.resolve(times);
};

/** Return consistent random time slots until `end` */
const fromDate = end => memoize(date => {
    const start = date.getHours();
    const times = fromOpeningHours(end)(Math.max(openingHour, start));
    return times.filter(isValidTime);
}, getISODate);

/** Return consistent random time slots */
const getTimeSlots = fromDate(closingHour)

/** Resolve to `true` 2/3 of the time */
const submitAPI = () => Promise.resolve(Math.random() < 2/3);
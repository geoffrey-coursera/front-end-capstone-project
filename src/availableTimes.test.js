import { fromOpeningHours, fromDate } from './availableTimes';

export { laterThan, isTimeSlot };

const laterThan = (times, hour) =>
    times.map(parseSlot)
        .map(([h]) => h)
        .every(h => h > hour);

const parseSlot = slot => slot.split(':').map(Number);

const isTimeSlot = timeSlot =>
    typeof timeSlot === 'string'
    && timeSlot.length === 5
    && timeSlot[2] === ":"
    && timeSlot.split(':').map(Number)

test('`fromOpeningHours` gets all time slots from `start` to `end`', () =>
    expect(fromOpeningHours(22)(17)).toStrictEqual([
        '18:00', '19:00', '20:00', '21:00', '22:00'
    ])
);

test('`fromDate` gets at least one time slot later than current time', () => {
    const closingHour = 22;
    const currentHour = 17;
    const times = fromDate(closingHour)(new Date(2024, 1, 30, currentHour));

    expect(times.every(isTimeSlot)).toBeTruthy();
    expect(laterThan(times, currentHour)).toBeTruthy();
    expect(times.length).toBeGreaterThanOrEqual(1);       
});
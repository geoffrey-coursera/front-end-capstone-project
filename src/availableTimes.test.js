import { enumerateTimeSlots, fetchTimes, getTimeSlots } from './availableTimes';

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

test('`enumerateTimeslots` gets all time slots from `start` to `end`', () =>
    expect(enumerateTimeSlots(17, 22)).toStrictEqual([
        '18:00', '19:00', '20:00', '21:00', '22:00'
    ])
);

describe('getTimeSlots', () => {
    describe('given a date and opening hours', () => {
        const fromDate = getTimeSlots(12, 22);
        const getDate = (hour) => new Date(2024, 1, 20, hour);
    
        describe('if current time is sooner than closing hour', () => {
            const currentHour = 17;
    
            test('then getTimeSlots gets at least one time slot later than current time', () => {
                const times = fromDate(getDate(currentHour));
    
                expect(times.every(isTimeSlot)).toBeTruthy();
                expect(laterThan(times, currentHour)).toBeTruthy();
                expect(times.length).toBeGreaterThanOrEqual(1);
            })
        })
    
        describe('if current time is later than closing hour', () => {
            const currentHour = 23;
    
            test('then fetchTimes gets an empty list', () => {
                const times = fromDate(
                    new Date(2024, 1, 20, currentHour)
                );
        
                expect(times.length).toBe(0);
            })
        })
    });
});

test('Opening hours are in the range [12, 22]', async () => {
    const tooEarly = new Date(2024, 1, 20, 10);
    const tooLate = new Date(2024, 1, 21, 23);

    const earlyTimes = await fetchTimes(tooEarly);
    const lateTimes = await fetchTimes(tooLate);

    expect(parseFloat(earlyTimes[0])).toBeGreaterThan(12);
    expect(lateTimes.length).toBe(0);
});

test('fetchTimes consistently returns the same timeSlots for the same date', async () => {
    const date = new Date(2024, 1, 30, 17);

    const times1 =  await fetchTimes(date);
    const times2 =  await fetchTimes(date);

    expect(times1).toStrictEqual(times2);
});
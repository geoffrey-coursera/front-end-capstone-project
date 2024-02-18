import { generateTimes } from './availableTimes';


test('Generate times from `start` to `end`', () =>
    expect(generateTimes(17, 22)()).toStrictEqual([
        '18:00', '19:00', '20:00', '21:00', '22:00'
    ])
);
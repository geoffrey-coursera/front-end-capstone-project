export { generateTimes };

const generateTimes = (start, end) => () => {
    return Array.from(
        {length: end - start},
        (_, i) => String(start + i + 1).padStart(2, '0') + ':00'
    );
};
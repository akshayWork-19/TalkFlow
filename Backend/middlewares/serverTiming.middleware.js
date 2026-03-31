export const serverTiming = (req, res, next) => {
    const startTime = process.hrtime();
    const timings = {};

    res.startTime = (key, description = '') => {
        timings[key] = { start: process.hrtime(), description };
    }

    res.endTime = (key) => {
        if (timings[key]) {
            const diff = process.hrtime(timings[key].start);
            timings[key].duration = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
        }
    };
    const originalEnd = res.end;
    res.end = function (...args) {
        const totalDiff = process.hrtime(startTime);
        const totalDur = (totalDiff[0] * 1000 + totalDiff[1] / 1e6).toFixed(2);

        let headerStr = `total;dur=${totalDur};desc="Total Request"`;

        for (const key in timings) {
            if (timings[key].duration) {
                headerStr += `, ${key};dur=${timings[key].duration};desc="${timings[key].description}"`;
            }
        }

        res.setHeader(`Server-Timing`, headerStr);
        originalEnd.apply(this, args);
    }

    next();


}
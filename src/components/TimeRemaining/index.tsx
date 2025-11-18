import { useState, useEffect } from 'react';

let dailyReset = new Date().setUTCHours(24, 0, 0);
// const fullDayMS = 86_400_000;

function pad(num: any) {
    return parseInt(num).toString().padStart(2, "0");
}

export default function TimeRemaining() {
    const [timeRemaining, setTimeRemaining] = useState<string>("24h 00m 00s");
    const [tickID, setTickId] = useState<number | null>(null);

    useEffect(() => {
        setTickId(window.requestAnimationFrame(tick));

        return () => {
            if (tickID !== null) window.cancelAnimationFrame(tickID);
        }
    }, []);

    function tick() {
        const now = new Date();
        const nowTime = now.getTime();

        if (nowTime > dailyReset) {
            dailyReset = new Date(dailyReset).setDate(now.getDate() + 1);
        }

        const remaining = ((dailyReset - nowTime) / 1000);
        const hh = pad((remaining / 60 / 60) % 60);
        const mm = pad((remaining / 60) % 60);
        const ss = pad(remaining % 60);

        setTimeRemaining(`${hh}h ${mm}m ${ss}s`);
        setTickId(window.requestAnimationFrame(tick));
    }

    return <div className='time-remaining'>{ timeRemaining }</div>;
}
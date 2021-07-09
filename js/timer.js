export function timer() {
    const timeRemainingSmall = document.getElementById("timeRemainingSmall");
    const timeRemainingLarge = document.getElementById("timeRemainingLarge");

    getTimeRemaining();

    function getTimeRemaining() {
        const dailyReset = new Date();

        dailyReset.setUTCHours(24, 0, 0);

        function pad(num) {
            return ("0" + parseInt(num)).substr(-2);
        }

        function tick() {
            const now = new Date();

            if (now > dailyReset) { // too late, go to tomorrow
                dailyReset.setDate(dailyReset.getDate() + 1);
            }

            const remain = ((dailyReset - now) / 1000);
            const hh = pad((remain / 60 / 60) % 60);
            const mm = pad((remain / 60) % 60);
            const ss = pad(remain % 60);

            timeRemainingSmall.textContent = `${hh}h ${mm}m ${ss}s`;
            timeRemainingLarge.textContent = `Daily resets in ${hh} hours ${mm} minutes ${ss} seconds`;

            setTimeout(tick, 0);
        }

        tick();
    }
}

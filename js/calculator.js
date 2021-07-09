export function calculator() {
    const calculationsDiv = document.getElementById("calculations");

    const startDateText = document.getElementById("startDate");
    const currentMultiplier = document.getElementById("currentMultiplier");

    const expectedHeadingText = document.getElementById("expectedHeading");
    const expectedDateText = document.getElementById("expectedDate");
    const expectedMultiplier = document.getElementById("expectedMultiplier");
    //const expectedXP = document.getElementById("expectedXP");

    const info = document.getElementById("info");

    const streakToDateRadio = document.getElementById("streakToDate");
    const dateToStreakRadio = document.getElementById("dateToStreak");

    const desiredStreakTextFieldDiv = document.getElementById("desiredStreakTextFieldDiv");
    const desiredDateInputDiv = document.getElementById("desiredDateInputDiv");

    const desiredStreakTextField = document.getElementById("desiredStreakTextField");
    const desiredDateInput = document.getElementById("desiredDateInput");
    const currentStreakTextField = document.getElementById("currentStreakTextField");
    //const currentLevelTextField = document.getElementById("currentLevelTextField");

    const yesRadio = document.getElementById("yesRadio");
    const noRadio = document.getElementById("noRadio");

    const calculateButton = document.getElementById("calculateButton");

    calculateButton.addEventListener("click", calculate);
    streakToDateRadio.addEventListener("input", changeCalculator);
    dateToStreakRadio.addEventListener("input", changeCalculator);

    document.querySelectorAll("input[type='text']").forEach(function(input) {
        input.addEventListener("keydown", function(event) {
            if (event.keyCode == 13) calculate(); //Enter Key (13)
        });
    });

    changeCalculator();

    function changeCalculator() {
        if (streakToDateRadio.checked) {
            desiredDateInputDiv.style.display = "none";
            desiredStreakTextFieldDiv.style.display = "block";
        } else {
            desiredStreakTextFieldDiv.style.display = "none";
            desiredDateInputDiv.style.display = "block";
        }
    }

    function calculate() {
        const enterFields = "Please fill out all of the fields!";
        const invalidNumber = "Please enter a valid number!";

        function showInfo(show, text) {
            if (show) {
                calculationsDiv.style.display = "none";
                info.style.display = "block";
                info.textContent = text;
            } else {
                calculationsDiv.style.display = "flex";
                info.style.display = "none";
            }
        }

        if (currentStreakTextField.value == "" || /*currentLevelTextField.value == "" ||*/ !yesRadio.checked && !noRadio.checked) {
            showInfo(true, enterFields);
        } else if (streakToDateRadio.checked && desiredStreakTextField.value == "") {
            showInfo(true, enterFields);
        } else if (dateToStreakRadio.checked && desiredDateInput.value == "") {
            showInfo(true, enterFields);
        } else if (isNaN(currentStreakTextField.value)/* || isNaN(currentLevelTextField.value)*/) {
            showInfo(true, invalidNumber);
        } else if (streakToDateRadio.checked && isNaN(desiredStreakTextField.value)) {
            showInfo(true, invalidNumber);
        } else {
            showInfo(false);
            updateCalculations();
        }

        function numExtender(num) {
            let r = num % 10;
            let hr = num % 100;

            if (r == 1 && hr != 11) {
                return num.toString() + 'st';
            } else if (r == 2 && hr != 12) {
                return num.toString() + 'nd';
            } else if (r == 3 && hr != 13) {
                return num.toString() + 'rd';
            }

            return num.toString() + 'th';
        }

        function updateCalculations() {
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const days = desiredStreakTextField.value - currentStreakTextField.value;
            const desiredDateParts = desiredDateInput.value.split("-");
            let expectedDateMS;
            let startDateMS;
            let desiredDateMS;

            if (yesRadio.checked) {
                expectedDateMS = new Date().setDate(new Date().getDate() + days);
                startDateMS = new Date().setDate(new Date().getDate() - currentStreakTextField.value);
                desiredDateMS = new Date(desiredDateParts[0], desiredDateParts[1] - 1, desiredDateParts[2]).getTime();
            } else if (noRadio.checked) {
                expectedDateMS = new Date().setDate(new Date().getDate() + days - 1);
                startDateMS = new Date().setDate(new Date().getDate() - currentStreakTextField.value - 1);
                desiredDateMS = new Date(desiredDateParts[0], desiredDateParts[1] - 1, desiredDateParts[2]).getTime() - 1;
            }

            const expectedDate = new Date(expectedDateMS);
            const startDate = new Date(startDateMS);
            const desiredDate = new Date(desiredDateMS);

            const now = new Date();
            const startDaysAgo = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const expectedDaysLeft = Math.round((expectedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const desiredDateStreak = Math.round((desiredDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            startDateText.textContent = `Started on ${weekDays[startDate.getDay()]}, ${months[startDate.getMonth()]} ${numExtender(startDate.getDate())}, ${startDate.getFullYear()} (${startDaysAgo} days ago)`;
            currentMultiplier.innerHTML = `<span>Multiplier:</span> x${(1 + (currentStreakTextField.value / 150)).toFixed(3)}`;
            
            //expectedXP.innerHTML = `<span>Estimated XP:</span> 500 XP`;

            if (streakToDateRadio.checked) {
                expectedHeadingText.textContent = "Desired Streak";
                expectedDateText.textContent = `Expected on ${weekDays[expectedDate.getDay()]}, ${months[expectedDate.getMonth()]} ${numExtender(expectedDate.getDate())}, ${expectedDate.getFullYear()} (${expectedDaysLeft} days left)`;
                expectedMultiplier.innerHTML = `<span>Multiplier:</span> x${(1 + (desiredStreakTextField.value / 150)).toFixed(3)}`;
            } else {
                expectedHeadingText.textContent = "Desired Date";
                expectedDateText.innerHTML = `<span>Expected Streak:</span> ${desiredDateStreak}`;
                expectedMultiplier.innerHTML = `<span>Multiplier:</span> x${(1 + (desiredDateStreak / 150)).toFixed(3)}`;
            }
        }
    }
}

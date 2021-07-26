export function calculator() {
    const calculationsDiv = document.getElementById("calculations");

    const startDateElement = document.getElementById("startDateElement");
    const currentMultiplierElement = document.getElementById("currentMultiplierElement");

    const desiredHeading = document.getElementById("desiredHeading");
    const expectedElement = document.getElementById("expectedElement");
    const expectedMultiplierElement = document.getElementById("expectedMultiplierElement");

    const infoElement = document.getElementById("infoElement");

    const desiredStreakTextFieldDiv = document.getElementById("desiredStreakTextFieldDiv");
    const desiredDateInputDiv = document.getElementById("desiredDateInputDiv");

    const desiredStreakTextField = document.getElementById("desiredStreakTextField");
    const desiredDateInput = document.getElementById("desiredDateInput");
    const currentStreakTextField = document.getElementById("currentStreakTextField");

    const yesRadio = document.getElementById("yesRadio");
    const noRadio = document.getElementById("noRadio");

    const calculateButton = document.getElementById("calculateButton");

    const changeCalculatorButton = document.getElementById("changeCalculatorButton");
    const currentCalculatorElement = document.getElementById("currentCalculatorElement");

    calculateButton.addEventListener("click", calculate);
    changeCalculatorButton.addEventListener("click", changeCalculator);

    document.querySelectorAll("input[type='text'], input[type='date']").forEach(function(input) {
        input.addEventListener("keydown", function(event) {
            if (event.keyCode == 13) calculate(); //Enter Key (13)
        });
    });

    let streakToDate = true;

    function changeCalculator() {
        streakToDate = !streakToDate;

        updateCalculator();
    }

    updateCalculator();

    function updateCalculator() {
        if (streakToDate) {
            desiredDateInputDiv.style.display = "none";
            desiredStreakTextFieldDiv.style.display = "block";
            desiredHeading.textContent = "Desired Streak";
            currentCalculatorElement.innerHTML = "<span class='gray'>Current Calculator:</span> Streak to Date";
        } else {
            desiredStreakTextFieldDiv.style.display = "none";
            desiredDateInputDiv.style.display = "block";
            desiredHeading.textContent = "Desired Date";
            currentCalculatorElement.innerHTML = "<span class='gray'>Current Calculator:</span> Date to Streak";
        }
    }

    function calculate() {
        const enterFields = "Please fill out all of the fields!";
        const invalidNumber = "Please enter a valid number!";

        function showInfo(show, text) {
            if (show) {
                calculationsDiv.style.display = "none";
                infoElement.style.display = "block";
                infoElement.textContent = text;
            } else {
                calculationsDiv.style.display = "flex";
                infoElement.style.display = "none";
            }
        }

        if (currentStreakTextField.value == "" || !yesRadio.checked && !noRadio.checked) {
            showInfo(true, enterFields);
        } else if (streakToDate && desiredStreakTextField.value == "") {
            showInfo(true, enterFields);
        } else if (!streakToDate && desiredDateInput.value == "") {
            showInfo(true, enterFields);
        } else if (isNaN(currentStreakTextField.value)) {
            showInfo(true, invalidNumber);
        } else if (streakToDate && isNaN(desiredStreakTextField.value)) {
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
            let expectedDateMS;
            let startDateMS;

            if (yesRadio.checked) {
                expectedDateMS = new Date().setDate(new Date().getDate() + days);
                startDateMS = new Date().setDate(new Date().getDate() - currentStreakTextField.value);
            } else if (noRadio.checked) {
                expectedDateMS = new Date().setDate(new Date().getDate() + days - 1);
                startDateMS = new Date().setDate(new Date().getDate() - currentStreakTextField.value - 1);
            }

            const expectedDate = new Date(expectedDateMS);
            const startDate = new Date(startDateMS);
        
            const now = new Date();
            const startDaysAgo = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const expectedDaysLeft = Math.round((expectedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            const desiredDateParts = desiredDateInput.value.split("-");
            const desiredDate = new Date(desiredDateParts[0], desiredDateParts[1] - 1, desiredDateParts[2]);
            const desiredDateStreak = Math.ceil((desiredDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            startDateElement.innerHTML = `<span class="gray">Started On:</span> ${weekDays[startDate.getDay()]}, ${months[startDate.getMonth()]} ${numExtender(startDate.getDate())}, 
                ${startDate.getFullYear()} (${startDaysAgo} days ago)`;

            currentMultiplierElement.innerHTML = `<span class="gray">Multiplier:</span> x${(1 + (currentStreakTextField.value / 150)).toFixed(3)}`;

            if (streakToDate) {
                expectedElement.innerHTML = `<span class="gray">Expected On:</span> ${weekDays[expectedDate.getDay()]}, ${months[expectedDate.getMonth()]} ${numExtender(expectedDate.getDate())}, 
                    ${expectedDate.getFullYear()} (${expectedDaysLeft} days left)`;

                expectedMultiplierElement.innerHTML = `<span class="gray">Multiplier:</span> x${(1 + (desiredStreakTextField.value / 150)).toFixed(3)}`;
            } else {
                expectedElement.innerHTML = `<span class="gray">Expected Streak:</span> ${desiredDateStreak}`;
                expectedMultiplierElement.innerHTML = `<span class="gray">Multiplier:</span> x${(1 + (desiredDateStreak / 150)).toFixed(3)}`;
            }
        }
    }
}

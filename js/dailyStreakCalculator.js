const desiredStreakText = document.getElementById("desiredStreakText");
const currentStreakText = document.getElementById("currentStreakText");
const calculateButton = document.getElementById("calculateButton");
const yesRadio = document.getElementById("yesRadio");
const noRadio = document.getElementById("noRadio");
const streakCalculations = document.getElementById("streakCalculations");

const startDateText = document.getElementById("startDate");
const expectedDateText = document.getElementById("expectedDate");
const currentMultiplier = document.getElementById("currentMultiplier");
const expectedMultiplier = document.getElementById("expectedMultiplier");
const requiredText = document.getElementById("requiredText");
const timeRemainingText = document.getElementById("timeRemainingText");

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

calculateButton.addEventListener("click", calculateStreak);
document.querySelectorAll("input[type='text']").forEach(function(i) {
  i.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) { //Enter Key (13)
      calculateStreak();
    }
  });
});

function numExtender(num) {
  let r = num % 10
  let hr = num % 100 
  if (r == 1 && hr != 11) {
      return num.toString() + 'st'
  } else if (r == 2 && hr != 12) {
      return num.toString() + 'nd'
  } else if (r == 3 && hr != 13) {
      return num.toString() + 'rd'
  }
  return num.toString() + 'th'
}

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

    timeRemainingText.textContent = `Daily resets in ${hh} hours ${mm} minutes ${ss} seconds`;
    setTimeout(tick, 0);
  }
  tick();
}

function calculateStreak() {
  const days = desiredStreakText.value - currentStreakText.value;
  let expectedDateMS;
  let startDateMS;

  if (yesRadio.checked == true) {
    expectedDateMS = new Date().setDate(new Date().getDate() + days);
    startDateMS = new Date().setDate(new Date().getDate() - currentStreakText.value);
  } else if (noRadio.checked == true) {
    expectedDateMS = new Date().setDate(new Date().getDate() + days - 1);
    startDateMS = new Date().setDate(new Date().getDate() - currentStreakText.value - 1);
  }
  
  const expectedDate = new Date(expectedDateMS);
  const startDate = new Date(startDateMS);

  const now = new Date();
  const startDaysAgo = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const expectedDaysLeft = Math.round((expectedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (desiredStreakText.value == "" || currentStreakText.value == "" || yesRadio.checked == false && noRadio.checked == false) {
    requiredText.textContent = "Please fill out all of the fields.";
    streakCalculations.style.display = "none";
  } else if (isNaN(desiredStreakText.value) || isNaN(currentStreakText.value)) {
    requiredText.textContent = "Please enter a number.";
    streakCalculations.style.display = "none";
  } else {
    streakCalculations.style.display = "grid";
    requiredText.textContent = "";
    startDateText.textContent = `Started on ${weekDays[startDate.getDay()]}, ${months[startDate.getMonth()]} ${numExtender(startDate.getDate())}, ${startDate.getFullYear()} (${startDaysAgo} days ago)`;
    expectedDateText.textContent = `Expected on ${weekDays[expectedDate.getDay()]}, ${months[expectedDate.getMonth()]} ${numExtender(expectedDate.getDate())}, ${expectedDate.getFullYear()} (${expectedDaysLeft} days left)`;
    currentMultiplier.textContent = `Multiplier: x${(1 + (currentStreakText.value / 150)).toFixed(3)}`;
    expectedMultiplier.textContent = `Multiplier: x${(1 + (desiredStreakText.value / 150)).toFixed(3)}`;
  }
}

//Material Design JS
mdc.autoInit();
mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));

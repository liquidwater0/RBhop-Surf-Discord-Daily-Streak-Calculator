const desiredStreakText = document.getElementById("desiredStreakText");
const currentStreakText = document.getElementById("currentStreakText");
const calculateButton = document.getElementById("calculateButton");
const yesRadio = document.getElementById("yesRadio");
const noRadio = document.getElementById("noRadio");

const desiredStreakDate = document.getElementById("desiredStreakDate");
const streakStartDate = document.getElementById("streakStartDate");
const requiredText = document.getElementById("requiredText");
const timeRemainingText = document.getElementById("timeRemainingText");
const multiplierText = document.getElementById("multiplier");

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

calculateButton.addEventListener("click", calculateStreak);

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
  let dateMS;
  let startDateMS;

  const multiplier = 0.015;

  if (yesRadio.checked == true) {
    dateMS = new Date().setDate(new Date().getDate() + days);
    startDateMS = new Date().setDate(new Date().getDate() - currentStreakText.value);
  } else if (noRadio.checked == true) {
    dateMS = new Date().setDate(new Date().getDate() + days - 1);
    startDateMS = new Date().setDate(new Date().getDate() - currentStreakText.value - 1);
  }
  
  const date = new Date(dateMS);
  const startDate = new Date(startDateMS);

  if (desiredStreakText.value == "" || currentStreakText.value == "" || yesRadio.checked == false && noRadio.checked == false) {
    requiredText.textContent = "Please fill out all of the fields.";
    desiredStreakDate.textContent = "";
    streakStartDate.textContent = "";
    multiplierText.textContent = "";
  } else {
    requiredText.textContent = "";
    desiredStreakDate.textContent = `You will get your desired streak on ${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${numExtender(date.getDate())}, ${date.getFullYear()}`;
    streakStartDate.textContent = `You started this streak on ${weekDays[startDate.getDay()]}, ${months[startDate.getMonth()]} ${numExtender(startDate.getDate())}, ${startDate.getFullYear()}`; 
    multiplierText.textContent = `Multiplier: x${multiplier * desiredStreakText.value}`; 
  }
}

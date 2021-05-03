const desiredStreakText = document.getElementById("desiredStreakText");
const currentStreakText = document.getElementById("currentStreakText");
const calculateButton = document.getElementById("calculateButton");
const yesRadio = document.getElementById("yesRadio");
const noRadio = document.getElementById("noRadio");

const desiredStreakDate = document.getElementById("desiredStreakDate");
const streakStartDate = document.getElementById("streakStartDate");
const requiredText = document.getElementById("requiredText");

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

function calculateStreak() {
  const days = desiredStreakText.value - currentStreakText.value;
  let dateMS;
  let startDateMS;

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
  } else {
    requiredText.textContent = "";
    desiredStreakDate.textContent = `You will get your desired streak on ${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${numExtender(date.getDate())}, ${date.getFullYear()}`;
    streakStartDate.textContent = `You started this streak on ${weekDays[startDate.getDay()]}, ${months[startDate.getMonth()]} ${numExtender(startDate.getDate())}, ${startDate.getFullYear()}`;  
  }
}

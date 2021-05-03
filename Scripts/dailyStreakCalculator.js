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

  let d;
  let s;

  if (date.getDate() == 1 || date.getDate() == 21 || date.getDate() == 31) {
    d = "st";
  } else if (date.getDate() == 2 || date.getDate() == 22) {
    d = "nd";
  } else if (date.getDate() == 3 || date.getDate() == 23) {
    d = "rd";
  } else if (date.getDate() == 4 || date.getDate() == 5 || date.getDate() == 6 || date.getDate() == 7 || date.getDate() == 8 || date.getDate() == 9 || date.getDate() == 10 
    || date.getDate() == 11 || date.getDate() == 12 || date.getDate() == 13 || date.getDate() == 14 || date.getDate() == 15 || date.getDate() == 16 || date.getDate() == 17 
    || date.getDate() == 18 || date.getDate() == 19 || date.getDate() == 20 || date.getDate() == 24 || date.getDate() == 25 || date.getDate() == 26 || date.getDate() == 27 
    || date.getDate() == 28 || date.getDate() == 29 || date.getDate() == 30) {
    d = "th";
  }

  if (startDate.getDate() == 1 || startDate.getDate() == 21 || startDate.getDate() == 31) {
    s = "st";
  } else if (startDate.getDate() == 2 || startDate.getDate() == 22) {
    s = "nd";
  } else if (startDate.getDate() == 3 || startDate.getDate() == 23) {
    s = "rd";
  } else if (startDate.getDate() == 4 || startDate.getDate() == 5 || startDate.getDate() == 6 || startDate.getDate() == 7 || startDate.getDate() == 8 || startDate.getDate() == 9 || startDate.getDate() == 10 
    || startDate.getDate() == 11 || startDate.getDate() == 12 || startDate.getDate() == 13 || startDate.getDate() == 14 || startDate.getDate() == 15 || startDate.getDate() == 16 || startDate.getDate() == 17 
    || startDate.getDate() == 18 || startDate.getDate() == 19 || startDate.getDate() == 20 || startDate.getDate() == 24 || startDate.getDate() == 25 || startDate.getDate() == 26 || startDate.getDate() == 27 
    || startDate.getDate() == 28 || startDate.getDate() == 29 || startDate.getDate() == 30) {
    s = "th";
  }

  if (desiredStreakText.value == "" || currentStreakText.value == "" || yesRadio.checked == false && noRadio.checked == false) {
    requiredText.textContent = "Please fill out all of the field.";
    desiredStreakDate.textContent = "";
    streakStartDate.textContent = "";
  } else {
    requiredText.textContent = "";
    desiredStreakDate.textContent = `You will get your desired streak on ${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}${d}, ${date.getFullYear()}`;
    streakStartDate.textContent = `You started this streak on ${weekDays[startDate.getDay()]}, ${months[startDate.getMonth()]} ${startDate.getDate()}${s}, ${startDate.getFullYear()}`;  
  }
}

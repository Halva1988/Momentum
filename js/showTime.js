import { getDate, showDate } from "./getDate.js";
import { showGreeting } from "./showGreeting.js";

let time = document.querySelector('.time');

function showTime() {
  time.textContent = getDate().toLocaleTimeString();
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

export default showTime;
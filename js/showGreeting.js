import { getDate } from "./getDate.js";

let greeting = document.querySelector('.greeting');

function showGreeting() {
  greeting.textContent = `Good ${ getTimeOfDay(getDate().getHours()) }`;
}

function getTimeOfDay(hour) {
  switch (true) {
    case  hour >= 6 && hour < 12 :
      return 'morning';
    case hour >= 12 && hour < 18:
      return 'afternoon';
    case  hour >= 18 && hour < 24 :
      return 'evening';
    case  hour >= 0 && hour < 6 :
      return 'night';
  }
}

export { showGreeting, getTimeOfDay }
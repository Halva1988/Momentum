const body = document.querySelector("body")
let time = document.querySelector('.time');
let date = document.querySelector('.date');
let greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
let randomNum = getRandomNum(1, 7);
const prev = document.querySelector('.slide-prev');
const next = document.querySelector('.slide-next');

function getDate() {
  return new Date()
}

setBg();

function showTime() {
  time.textContent = getDate().toLocaleTimeString();
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

showTime();

function showDate() {
  const options = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  }
  date.textContent = getDate().toLocaleDateString('ru-RU', options);
}

// ------Time of day ------//
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

function showGreeting() {
  greeting.textContent = `Good ${ getTimeOfDay(getDate().getHours()) }`;
}

// -----LocalStorage ----- //

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name')
  }
}

window.addEventListener('load', getLocalStorage)

// -----RandomNumber -----//
function getRandomNum(min, max) {
  return Math.round(Math.random() * ( max - min ) + min);
}

// ----Background Image -----//

function setBg() {
  const timeOfDay = getTimeOfDay(getDate().getHours());
  body.style.backgroundImage =
    `url(../assets/img/${ timeOfDay }/${ randomNum }.webp)`;
}

function getSlideNext() {
  setBg();
  if (randomNum < 7) {
    randomNum += 1;
  } else {
    randomNum = 1;
  }
}

function getSlidePrev() {
  setBg();
  if (randomNum > 1) {
    randomNum -= 1;
  } else {
    randomNum = 7;
  }
}

prev.addEventListener('click', getSlidePrev);
next.addEventListener('click', getSlideNext);
`
https://api.openweathermap.org/data/2.5/weather?q=санкт+петербург&lang=ru&appid=287ed49e837589a1a976386e94f0f2c5&units=metric`
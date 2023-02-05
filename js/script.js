const body = document.querySelector("body")
let time = document.querySelector('.time');
let date = document.querySelector('.date');
let greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
let randomNum = getRandomNum(1, 7);
const prev = document.querySelector('.slide-prev');
const next = document.querySelector('.slide-next');
const weatherCity = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

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
  localStorage.setItem('weatherCity', weatherCity.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name')
  }
  if (localStorage.getItem('weatherCity')) {
    weatherCity.value = localStorage.getItem('weatherCity')
    getWeather()
  }
}

// -----RandomNumber -----//
function getRandomNum(min, max) {
  return Math.round(Math.random() * ( max - min ) + min);
}

// ----Background Image -----//

function setBg() {
  const timeOfDay = getTimeOfDay(getDate().getHours());
  const img = new Image();
  img.src = './dist/../assets/img/bg.webp';
  img.onload = () => {
    body.style.backgroundImage =
      `url(./dist/../assets/img/${ timeOfDay }/${ randomNum }.webp)`;
  };

}

// ----Slider -----//

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

// -----Weather ----//

async function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ weatherCity.value.replace(
      '-', ' ') }&lang=ru&appid=287ed49e837589a1a976386e94f0f2c5&units=metric`)
    .then(response => response.json())
    .then(result => {
      weatherIcon.className = 'weather-icon owf'
      weatherIcon.classList.add(`owf-${ result.weather[0].id }`);
      temperature.textContent = `${ Math.round(result.main.temp) }°C`;
      weatherDescription.textContent = result.weather[0].description;
      wind.textContent = `Скор. ветра: ${ result.wind.speed } m/s`;
      humidity.textContent = `Влажность: ${ result.main.humidity }%`;
    })
    .catch(err => console.log(err));
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather()
    weatherCity.blur()
  }
}

document.addEventListener('DOMContentLoaded', getLocalStorage, getWeather);
weatherCity.addEventListener('keypress', setCity);
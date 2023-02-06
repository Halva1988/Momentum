import playList from "./playList.js";

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
let isPlay = false;

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

function getWeather() {
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
    .catch(error => {
      console.log(error);
    });
}

function setCity(event) {
  if (event.code === 'Enter' || event.code === 13) {
    console.log(event.code)
    getWeather()
    weatherCity.blur()
  }
}

document.addEventListener('DOMContentLoaded', getLocalStorage, getWeather);
weatherCity.addEventListener('keypress', setCity);

// ----Quotes -----//
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const nextQuote = document.querySelector('.change-quote');

function getQuotes() {
  const quotesRandom = getRandomNum(0, 6);
  fetch('./dist/../json/data.json')
    .then(respons => respons.json())
    .then(result => {
      quote.textContent = result[`${ quotesRandom }`].text;
      author.textContent = result[`${ quotesRandom }`].author;
    });
}

getQuotes();

nextQuote.addEventListener('click', getQuotes);

// -----Player----//

const ulPlayList = document.querySelector('.play-list');
const play = document.querySelector('.play');
const prevSong = document.querySelector('.play-prev');
const nextSong = document.querySelector('.play-next');

const audio = new Audio();

let playNum = 0;

playList.forEach(el => {
  const liPlayItem = document.createElement('li');
  liPlayItem.classList.add('play-item');
  liPlayItem.textContent = `${ el.title }`
  ulPlayList.append(liPlayItem);
})

play.addEventListener('click', () => {
  if (isPlay) {
    pauseAudio()
  } else {
    playAudio()
  }
})

function playAudio() {
  ulPlayList.children[playNum].classList.add('item-active');
  audio.src = playList[playNum].src;
  play.classList.add('pause');
  audio.play();
  isPlay = true;
}

function pauseAudio() {
  play.classList.remove('pause');
  audio.pause();
  isPlay = false;
}

function playNext() {
  ulPlayList.children[playNum].classList.remove('item-active');
  playNum += 1;
  if (playNum > 3) {
    playNum = 0;
    return playAudio();
  }
  playAudio();
}

function playPrev() {
  ulPlayList.children[playNum].classList.remove('item-active');
  playNum -= 1;
  if (playNum < 0) {
    playNum = 3;
    return playAudio();
  }
  playAudio();
}

nextSong.addEventListener('click', playNext);
prevSong.addEventListener('click', playPrev);

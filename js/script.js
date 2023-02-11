import showTime from "./showTime.js";
import { getLinkToImg, getSlideNext, getSlidePrev } from "./background.js";
import { getWeather, setCity, setCityFocusOut, weatherCity } from "./weather.js";
import { getQuotes, nextQuote } from "./quotes.js";
import { playPrev, playNext } from "./player.js";
import { setLocalStorage, getLocalStorage } from "./localStorage.js";

// ------Time of day ------//

showTime();

// -----LocalStorage ----- //
window.addEventListener('beforeunload', setLocalStorage);
document.addEventListener('DOMContentLoaded', getLocalStorage, getWeather);

// ----Background Image -----//

getLinkToImg()

// ----Slider -----//

const prev = document.querySelector('.slide-prev');
const next = document.querySelector('.slide-next');
prev.addEventListener('click', getSlidePrev);
next.addEventListener('click', getSlideNext);

// -----Weather ----//

weatherCity.addEventListener('keypress', setCity);
weatherCity.addEventListener('focusout', setCityFocusOut);

// ----Quotes -----//

getQuotes();

nextQuote.addEventListener('click', getQuotes);

// -----Player----//

const prevSong = document.querySelector('.play-prev');
const nextSong = document.querySelector('.play-next');

nextSong.addEventListener('click', playNext);
prevSong.addEventListener('click', playPrev);
import { getWeather, weatherCity } from "./weather.js";

const name = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('weatherCity', weatherCity.value);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('weatherCity')) {
    weatherCity.value = localStorage.getItem('weatherCity');
    getWeather();
  }
}

export { setLocalStorage, getLocalStorage }

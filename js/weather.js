const weatherCity = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ weatherCity.value.replace(
      '-', ' ') }&lang=ru&appid=287ed49e837589a1a976386e94f0f2c5&units=metric`)
    .then(response => response.json())
    .then(result => {
      weatherError.style.display = 'none';
      weatherIcon.className = 'weather-icon owf'
      weatherIcon.classList.add(`owf-${ result.weather[0].id }`);
      temperature.textContent = `${ Math.round(result.main.temp) }°C`;
      weatherDescription.textContent = result.weather[0].description;
      wind.textContent = `Скор. ветра: ${ result.wind.speed } m/s`;
      humidity.textContent = `Влажность: ${ result.main.humidity }%`;
      console.log(weatherError)
    })
    .catch(() => {
      weatherError.style.display = 'block';
      temperature.textContent = ``;
      weatherDescription.textContent = '';
      wind.textContent = ``;
      humidity.textContent = ``;
    });
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    weatherCity.blur();
  }
}

function setCityFocusOut() {
  getWeather();
  weatherCity.blur();
}

export { getWeather, setCity, setCityFocusOut, weatherCity }
function getDate() {
  return new Date()
}

function showTime() {
  const time = document.querySelector('.time');
  time.textContent = getDate().toLocaleTimeString();
  const greeting = document.querySelector('.greeting');
  greeting.textContent = `Good ${getTimeOfDay(getDate().getHours())}`;
  showDate();
  setTimeout(showTime, 1000);
}

showTime()

function showDate() {
  const date = document.querySelector('.date');
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  date.textContent = getDate().toLocaleDateString('ru-RU', options);
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


const name = document.querySelector('.name');

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


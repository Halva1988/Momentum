function getDate() {
  return new Date()
}

function showTime() {
  const time = document.querySelector('.time');
  time.textContent = getDate().toLocaleTimeString();
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



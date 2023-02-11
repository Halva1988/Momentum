let date = document.querySelector('.date');

function getDate() {
  return new Date()
}

function showDate() {
  const options = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
  }
  date.textContent = getDate().toLocaleDateString('ru-RU', options);
}



export { getDate, showDate }
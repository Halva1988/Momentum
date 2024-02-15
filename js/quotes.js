import getRandomNum from "./getRandomNum.js";

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const nextQuote = document.querySelector('.change-quote');

function getQuotes() {
  const quotesRandom = getRandomNum(0, 6);
  fetch('./dist/../json/data.json')
    .then(response => response.json())
    .then(result => {
      quote.textContent = result[`${ quotesRandom }`].text;
      author.textContent = result[`${ quotesRandom }`].author;
    });
}

export { getQuotes, nextQuote }
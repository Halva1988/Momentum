import { getDate } from "./getDate.js";
import { getTimeOfDay } from "./showGreeting.js";

const limit = document.querySelector('.limitRequests');

const body = document.querySelector("body");
let linkPrevImg = '';
let linkImg = '';
function getLinkToImg() {
  const timeOfDay = getTimeOfDay(getDate().getHours());
  if (linkImg) {
    linkPrevImg = linkImg;
  }
  fetch(
    `https://api.unsplash.com/photos/random?query=${ timeOfDay }&client_id=ZG90PLEE98LxvENEMAkiS9KV0l_1WXinktMxBZ2n-vQ`)
    .then(response => response.json())
    .then(result => {
      limit.style.display = 'none';
      body.style.backgroundImage = `url(${ result.urls.regular })`;
      linkImg = result.urls.regular;
    })
    .catch(() => {
      limit.style.display = 'flex';
    })
}

function getSlideNext() {
  getLinkToImg();
}

function getSlidePrev() {
  if (linkPrevImg) {
    body.style.backgroundImage = `url(${ linkPrevImg })`;
    linkPrevImg = '';
    return;
  }
  getLinkToImg();

}

export { getLinkToImg, getSlideNext, getSlidePrev };
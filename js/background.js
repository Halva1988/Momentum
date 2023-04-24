import {getDate} from "./getDate.js";
import {getTimeOfDay} from "./showGreeting.js";

const limit = document.querySelector('.limitRequests');

const body = document.querySelector("body");
let linkPrevImg = '';
let linkImg = '';

async function getLinkToImg() {
  const timeOfDay = getTimeOfDay(getDate().getHours());
  if (linkImg) {
    linkPrevImg = linkImg;
  }
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${getTimeOfDay(getDate().getHours())}&client_id=ZG90PLEE98LxvENEMAkiS9KV0l_1WXinktMxBZ2n-vQ`);
  const result = await response.json();
  let img = new Image();
  img.onload = () => {
    limit.style.display = 'none';
    body.style.backgroundImage = `url(${result.urls.regular})`;
    linkImg = result.urls.regular;
  }
  img.onerror = () => {
    limit.style.display = 'flex';
  }
  img.src = result.urls.regular;
}

async function getSlideNext() {
  await getLinkToImg();
}

async function getSlidePrev() {
  if (linkPrevImg) {
    body.style.backgroundImage = `url(${linkPrevImg})`;
    linkPrevImg = '';
    return;
  }
  await getLinkToImg();

}

export {getLinkToImg, getSlideNext, getSlidePrev};
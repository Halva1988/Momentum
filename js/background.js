import { getDate } from "./getDate.js";
import { getTimeOfDay } from "./showGreeting.js";

const limit = document.querySelector('.limitRequests');
const body = document.querySelector("body");

let linkPrevImg = '';
let linkImg = '';

async function getLinkToImg() {
  const timeOfDay = getTimeOfDay(getDate().getHours());
  linkPrevImg = linkImg || '';
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=ZG90PLEE98LxvENEMAkiS9KV0l_1WXinktMxBZ2n-vQ`);
  const result = await response.json();
  linkImg = result.urls.regular;
  body.style.backgroundImage = `url(${linkImg})`;
  limit.style.display = 'none';
}


async function getSlidePrev() {
  if (linkPrevImg) {
    body.style.backgroundImage = `url(${linkPrevImg})`;
    linkPrevImg = '';
    return;
  }

  await getLinkToImg();
}

export { getLinkToImg, getSlidePrev };
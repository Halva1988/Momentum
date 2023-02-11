import playList from "./playList.js";

const ulPlayList = document.querySelector('.play-list');
const play = document.querySelector('.play');

let isPlay = false;
let playNum = 0;

const audio = new Audio();
playList.forEach(el => {
  const liPlayItem = document.createElement('li');
  liPlayItem.classList.add('play-item');
  liPlayItem.textContent = `${ el.title }`
  ulPlayList.append(liPlayItem);
})


function playAudio() {
  ulPlayList.children[playNum].classList.add('item-active');
  audio.src = playList[playNum].src;
  play.classList.add('pause');
  audio.play();
  isPlay = true;
}

function pauseAudio() {
  play.classList.remove('pause');
  audio.pause();
  isPlay = false;
}

function playNext() {
  ulPlayList.children[playNum].classList.remove('item-active');
  playNum += 1;
  if (playNum > 3) {
    playNum = 0;
    return playAudio();
  }
  playAudio();
}

function playPrev() {
  ulPlayList.children[playNum].classList.remove('item-active');
  playNum -= 1;
  if (playNum < 0) {
    playNum = 3;
    return playAudio();
  }
  playAudio();
}

play.addEventListener('click', () => {
  if (isPlay) {
    pauseAudio();
  } else {
    playAudio();
  }
})

export { playPrev, playNext }

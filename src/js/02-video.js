import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const playerTime = localStorage.getItem('videoplayer-current-time');

window.addEventListener('DOMContentLoaded', () => {
  player.setCurrentTime(playerTime);
});

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    localStorage.setItem('videoplayer-current-time', currentTime.seconds);
  }, 1000)
);

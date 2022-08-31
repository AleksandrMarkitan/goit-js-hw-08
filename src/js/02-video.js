import Player from '@vimeo/player';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  console.log(evt.seconds);
  localStorage.setItem('videoplayer-current-time', evt.seconds);
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

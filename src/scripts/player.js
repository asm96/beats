(function () {
  const player = document.querySelector('.player__elem');
  player.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  player.poster = './img/content/splashscreen.png';
  const playerContainer = $('.player');
  const playbackButton = $('.player__playback-button');
  const soundRangeButton = $('.player__sound-range-button');
  const durationEstimate = $('.player__duration-estimate');
  const durationCompleted = $('.player__duration-completed');
  const updateRange = 1000;
  let currentSoundButtonPosition = '';
  let currentVolume = 0;
  let interval;

  const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime % 60);

    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }

    return `${minutes}:${seconds}`;
  };

  const updateDuration = () => {
    const durationSec = player.duration;
    const completedSec = player.currentTime;
    const completedPercent = (completedSec / durationSec) * 100;

    playbackButton.css('left', `${completedPercent}%`);
    durationCompleted.text(formatTime(completedSec));
  };

  const playStop = () => {
    if (player.paused) {
      playerContainer.addClass('active');
      interval = setInterval(updateDuration, updateRange);
      player.play();
    } else {
      playerContainer.removeClass('active');
      clearInterval(interval);
      player.pause();
    }
  };

  $('.player__start').on('click', e => {
    e.preventDefault();
    playStop();
  });

  $('.player__splash-button').on('click', playStop);

  $('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX >= 0 ? e.originalEvent.layerX : 0;
    const newButtonPositionPersent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.duration / 100) * newButtonPositionPersent;

    playbackButton.css('left', `${newButtonPositionPersent}%`);
    player.currentTime = newPlaybackPositionSec;
    playStop();
  });

  $('.player__sound-range').on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX >= 0 ? e.originalEvent.layerX.toFixed() : 0;
    const soundLevel = (clickedPosition / bar.width()).toPrecision(1);
    const soundBtn = $('.player__sound');

    soundRangeButton.css('left', `${clickedPosition}px`);
    player.volume = soundLevel;

    soundLevel <= 0.05 ? soundBtn.addClass('muted') : soundBtn.removeClass('muted');
  });

  $('.player__sound').on('click', e => {
    e.preventDefault();
    const $this = $(e.currentTarget);

    if ($this.hasClass('muted')) {
      soundRangeButton.css('left', currentSoundButtonPosition);
      player.volume = currentVolume;
      $this.removeClass('muted');
    } else {
      currentSoundButtonPosition = soundRangeButton.css('left');
      currentVolume = player.volume;
      soundRangeButton.css('left', 0);
      player.volume = 0;
      $this.addClass('muted');
    }
  });

  player.addEventListener('canplay', () => {
    const durationSec = player.duration;

    durationEstimate.text(formatTime(durationSec));
  });

  player.addEventListener('click', e => {
    if (e.currentTarget) playStop();
  });
})()
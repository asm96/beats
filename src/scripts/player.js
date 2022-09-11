(function () {
  const player = document.querySelector('.player__elem');
  player.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const playerContainer = $('.player');
  const playbackButton = $('.player__playback-button');
  const durationEstimate = $('.player__duration-estimate');
  const durationCompleted = $('.player__duration-completed');

  $('.player__start').on('click', e => {
    e.preventDefault();
    if (playerContainer.hasClass('active')) {
      playerContainer.removeClass("active");
      player.pause();
    } else {
      playerContainer.addClass("active");
      player.play();
    }
  });

  $('.player__splash').on('click', () => {
    playerContainer.addClass("active");
    player.play();
  });

  $('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPersent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.duration / 100) * newButtonPositionPersent;

    playbackButton.css('left', `${newButtonPositionPersent}%`);
    player.currentTime = newPlaybackPositionSec;
  });

  const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime % 60);

    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
  };

  player.addEventListener('canplay', () => {
    let interval;
    const durationSec = player.duration;

    durationEstimate.text(formatTime(durationSec));

    if (typeof interval !== undefined) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      const completedSec = player.currentTime;
      const completedPercent = (completedSec / durationSec) * 100;

      playbackButton.css('left', `${completedPercent}%`);

      durationCompleted.text(formatTime(completedSec));
    }, 1000);
  });

  player.addEventListener('click', e => {
    if (e.currentTarget) {
      if (playerContainer.hasClass('active')) {
        playerContainer.removeClass("active");
        player.pause();
      } else {
        playerContainer.addClass("active");
        player.play();
      }
    }
  })
})()
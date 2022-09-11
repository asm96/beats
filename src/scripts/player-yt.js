/*; let player;
const playerContainer = $('.player');
const playbackButton = $('.player__playback-button');
const durationEstimate = $('.player__duration-estimate');
const durationCompleted = $('.player__duration-completed');

const eventsInit = () => {
  $('.player__start').on('click', e => {
    e.preventDefault();
    if (playerContainer.hasClass('active')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPersent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPersent;

    playbackButton.css('left', `${newButtonPositionPersent}%`);
    player.seekTo(newPlaybackPositionSec);
  });

  $('.player__splash').on('click', e => {
    player.playVideo();
  });
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime % 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  durationEstimate.text(formatTime(durationSec));

  if (typeof interval !== undefined) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    playbackButton.css('left', `${completedPercent}%`);

    durationCompleted.text(formatTime(completedSec));
  }, 1000);
};

const onPlayerStateChange = e => {
  // -1 (воспроизведение видео не начато)
  //  0 (воспроизведение видео завершено)
  //  1 (воспроизведение)
  //  2 (пауза)
  //  3 (буферизация)
  //  5 (видео подают реплики).

  switch (e.data) {
    case 1:
      playerContainer.addClass("active");
      break;

    case 2:
      playerContainer.removeClass("active");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '392',
    width: '663',
    videoId: 'TMzo9zjkuHc',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  });
}

eventsInit();*/
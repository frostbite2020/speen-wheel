$(document).ready(function () {
  var mousetimeout;
  var screensaver_active = false;
  var idletime = 5;
  var vid = document.getElementById("video1");
  var current_time = "0:00";

  function show_screensaver() {
    $("#screensaver").fadeIn();
    screensaver_active = true;
    vid.autoplay = true;
    const current = current_time;
    if (current !== "0:00") {
      if (vid.paused) {
        vid.play();
      }
      vid.currentTime = current_time.current;
    }
    vid.play();
    screensaver_animation();
  }

  function stop_screensaver() {
    $("#screensaver").fadeOut();
    screensaver_active = false;
    vid.autoplay = false;
    vid.pause();
  }

  $(document).click(function () {
    clearTimeout(mousetimeout);

    if (screensaver_active) {
      stop_screensaver();
    }

    mousetimeout = setTimeout(function () {
      show_screensaver();
    }, 500 * idletime); // 5 secs
  });

  $(document).mousemove(function () {
    clearTimeout(mousetimeout);

    mousetimeout = setTimeout(function () {
      show_screensaver();
    }, 1000 * idletime); // 5 secs
  });

  function screensaver_animation() {
    if (screensaver_active) {
      $("#screensaver").animate(400, screensaver_animation);
    }
  }

  vid.addEventListener("timeupdate", function () {
    // current time
    var currentHours = Math.floor(vid.currentTime / 3600);
    var currentMinutes = Math.floor((vid.currentTime / 60) % 60);
    var currentSeconds = Math.floor(vid.currentTime % 60);
    if (vid.currentTime >= 600 && currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    current_time.textContent = `${
      currentHours ? currentHours + ":" : ""
    }${currentMinutes}:${
      currentSeconds >= 10 ? currentSeconds : "0" + currentSeconds
    }`;
  });

  // vid.addEventListener("mousedown", function (event) {
  //   console.log("this is progressbar");
  // const pos =
  //   (event.pageX -
  //     (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) /
  //   progressBar.offsetWidth;
  // video.currentTime = pos * video.duration;
  // });
});

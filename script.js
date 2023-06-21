// Script to play/pause about equadratures video in index page
// if atleast 30% of the video is visible on viewport.

var video = document.getElementById("videoAboutEQ");
var options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3, // Adjust the threshold value as needed
};

var observer = new IntersectionObserver(handleIntersection, options);
observer.observe(video);

function handleIntersection(entries) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio >= 0.3) {
      // Video is in view
      video.play();
    } else {
      // Video is out of view
      video.pause();
    }
  });
}

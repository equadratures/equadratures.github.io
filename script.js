/**
 * Animation on scroll
 */
AOS.init({
  easing: "ease-out-back",
  duration: 800,
  delay: 0,
  once: true,
  anchorPlacement: "bottom-center",
  //   disable: "mobile",
});

// Function to load the header
function loadHeader() {
  var headerContainer = document.getElementById("header");
  var headerRequest = new XMLHttpRequest();

  headerRequest.open("GET", "header.html", true);
  headerRequest.onreadystatechange = function () {
    if (headerRequest.readyState === 4 && headerRequest.status === 200) {
      headerContainer.innerHTML = headerRequest.responseText;
      markActivePage();
    }
  };

  headerRequest.send();
}

// Function to load the footer
function loadFooter() {
  var footerContainer = document.getElementById("footer");
  var footerRequest = new XMLHttpRequest();

  footerRequest.open("GET", "footer.html", true);
  footerRequest.onreadystatechange = function () {
    if (footerRequest.readyState === 4 && footerRequest.status === 200) {
      footerContainer.innerHTML = footerRequest.responseText;
    }
  };

  footerRequest.send();
}

// Function to mark the active page in the navigation
function markActivePage() {
  var navigationItems = document.querySelectorAll("#header nav a");
  var currentPage = window.location.pathname;

  var spanElement = document.createElement("span");
  spanElement.setAttribute("class", "sr-only");
  spanElement.textContent = "(current)";

  for (var i = 0; i < navigationItems.length; i++) {
    var link = navigationItems[i].getAttribute("href");

    if (currentPage.includes(link)) {
      // Add screen reader target.
      navigationItems[i].appendChild(spanElement);
      // Make element active.
      navigationItems[i].classList.add("active");
    }
  }
  // If on equadratures.org/ without 'index.html', set "Home" to be active
  if (currentPage == "/") {
    navigationItems[0].classList.add("active");
  }
}

// // Function to load the page content
// function loadPageContent(pageUrl) {
//   var mainContainer = document.getElementById("main");
//   var request = new XMLHttpRequest();

//   request.open("GET", pageUrl, true);
//   request.onreadystatechange = function () {
//     if (request.readyState === 4 && request.status === 200) {
//       mainContainer.innerHTML = request.responseText;
//       markActivePage(); // Update the active page after loading the content
//     }
//   };

//   request.send();
// }

// Function to load file content using jquery.
function loadFileContents(filePath, setPath = null) {
  // alert(filePath);
  // main = document.getElementById("main");
  // main.src = "index_content.html";
  $("#main").load(filePath, function () {});
  // $("#main").load(filePath);
  if (setPath != null) {
    window.history.pushState(null, "", setPath);
  }
}

// Function to load the file contents.
function loadFileContents(filePath, setPath = null) {
  var mainContainer = document.getElementById("main");
  var mainRequest = new XMLHttpRequest();

  mainRequest.open("GET", filePath, true);
  mainRequest.onreadystatechange = function () {
    if (mainRequest.readyState === 4 && mainRequest.status === 200) {
      mainContainer.innerHTML = mainRequest.responseText;
      markActivePage();
    }
  };

  if (setPath != null) {
    window.history.pushState(null, "", setPath);
  }

  mainRequest.send();
}

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

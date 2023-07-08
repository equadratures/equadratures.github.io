function replacePlotlyIframe(item) {
  $(document).ready(function () {
    var i, frames;
    frames = item.getElementsByTagName("iframe");
    var framepath;
    for (i = 0; i < frames.length; ++i) {
      var url = new URL(frames[i].title);
      framepath = url.pathname;
      frames[i].src = "/modals/notebooks/" + framepath;
    }
  });
}

const slideFadeOut = (elem) => {
  const fade = { opacity: 0, transition: "opacity 400ms" };
  elem.css(fade).slideUp();
};

const slideFadeIn = (elem) => {
  const fade = { opacity: 1, transition: "opacity 400ms" };
  elem.css(fade).slideUp();
};

var goToModal = function (value) {
  $(document).ready(function () {
    var embedfile;
    var modal = $(value);
    // $("#mainDiv").attr("data-aos", "fade-up");
    embedfile = modal.attr("html_file");

    var jupyterNotebook = document.getElementById("jupyterNotebook");

    // $("#mainDiv").prepend('<div id="jupyterNotebook">...</div>');
    // $("#mainDiv").before("<div></div>");
    // $("#jupyterNotebook").attr("data-aos", "fade-up");

    $("#jupyterNotebook").hide();

    $("#jupyterNotebook").addClass("d-flex");
    $("#jupyterNotebook").addClass("flex-column");
    $("#jupyterNotebook").addClass("mx-2 mx-sm-5");
    $("#jupyterNotebook").addClass("px-2 px-sm-5 pb-2 pb-sm-5");
    // $("#jupyterNotebook").css("margin-top", "62px");

    $("#jupyterNotebook").load(embedfile, async function () {
      var i, frames;
      frames = jupyterNotebook.getElementsByTagName("iframe");
      for (i = 0; i < frames.length; ++i) {
        frames[i].title = frames[i].src;
        frames[i].src = "";
      }
      replacePlotlyIframe(jupyterNotebook);
    });

    // $("#mainDiv").attr("data-aos", "fade-up");
    // $("#introContent").fadeOut();
    // $("#jupyterNotebook").fadeIn();

    $("#jupyterNotebook").ready(function () {
      slideFadeOut($("#introContent"));
      slideFadeIn($("#jupyterNotebook"));
    });

    // slideFadeOut($("#introContent"));
    // slideFadeIn($("#jupyterNotebook"));

    // var mainDiv = document.getElementById("mainDiv");

    // $("#mainDiv").load(embedfile, async function () {
    //   var i, frames;
    //   frames = mainDiv.getElementsByTagName("iframe");
    //   for (i = 0; i < frames.length; ++i) {
    //     frames[i].title = frames[i].src;
    //     frames[i].src = "";
    //   }
    //   replacePlotlyIframe(mainDiv);
    // });
  });
};

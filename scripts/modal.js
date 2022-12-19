function replacePlotlyIframe(item) {
    requirejs(["jquery"], function () {
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

var goToModal = function (value) {
    requirejs(["jquery"], function () {
        var embedfile;
        var modal = $(value);
        embedfile = modal.attr("html_file");

        var mainDiv = document.getElementById('mainDiv');

        $('#mainDiv').load(embedfile, async function () {
            var i, frames;
            frames = mainDiv.getElementsByTagName("iframe");
            for (i = 0; i < frames.length; ++i) {
                frames[i].title = frames[i].src;
                frames[i].src = "";
            }
            replacePlotlyIframe(mainDiv);
        });

    });
};

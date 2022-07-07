function replacePlotlyIframe(item2) {
    requirejs(["jquery"], function () {
        var i, frames;
        frames = item2.getElementsByTagName("iframe");
        var framepath;
        for (i = 0; i < frames.length; ++i) {
            var url = new URL(frames[i].title);
            framepath = url.pathname;
            if (localStorage.getItem('dark-mode') === 'false') {
                framepath = framepath.replace("dark", "light");
            }
            else {
                framepath = framepath.replace("light", "dark");
            }
            frames[i].src = "/modals/notebooks/" + framepath;
        }
    });
}


var goToModal = function (value) {
    requirejs(["jquery", "bootstrap"], function () {
        var embedfile;
        var modal = $(value);
        if (localStorage.getItem('dark-mode') === 'false') {
            embedfile = modal.attr("light");
        }
        else {
            embedfile = modal.attr("dark");
        }

        $('#replaceDiv').slideUp(0);

        var item = document.getElementById('mainDiv');
        item.classList.toggle("container");
        item.classList.toggle("infocontainer");
        var item2 = document.getElementById('replaceDiv');

        $('#mainDiv').slideUp(1000, function () {
            // $('#replaceDiv').load(embedfile).ready(function () {
            //     $('#replaceDiv').slideDown(2000, "linear");
            // });
            $('#replaceDiv').load(embedfile, async function () {
                var i, frames;
                frames = item2.getElementsByTagName("iframe");
                for (i = 0; i < frames.length; ++i) {
                    frames[i].title = frames[i].src;
                    frames[i].src = "";
                }
                $(this).slideDown(2000, "linear", function () {
                    replacePlotlyIframe(item2);

                    // window.PlotlyConfig = { MathJaxConfig: 'local' }; if (window.MathJax && window.MathJax.Hub && window.MathJax.Hub.Config) { window.MathJax.Hub.Config({ SVG: { font: "STIX-Web" } }) }; if (typeof require !== 'undefined') { require.undef("plotly"); requirejs.config({ paths: { 'plotly': ['/scripts/vendor/plotly-gl3d-2.12.1.min'] } }); require(['plotly'], function (a) { window._Plotly = a }) }
                });
            });
        });

        // $('.dark-switch').toggle("slide:right");
    });
};

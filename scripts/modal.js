function replacePlotlyIframe(item2) {
    requirejs(["jquery"], function () {
        var i, frames;
        frames = item2.getElementsByTagName("iframe");
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

        // $('#replaceDiv').slideUp(0);

        // var item = document.getElementById('mainDiv');
        // item.classList.toggle("container");
        // item.classList.toggle("infocontainer");
        var item2 = document.getElementById('mainDiv');

        // $('#mainDiv').slideUp(1000, function () {
        //     // $('#replaceDiv').load(embedfile).ready(function () {
        //     //     $('#replaceDiv').slideDown(2000, "linear");
        //     // });
        //     $('#replaceDiv').load(embedfile, async function () {
        //         var i, frames;
        //         frames = item2.getElementsByTagName("iframe");
        //         for (i = 0; i < frames.length; ++i) {
        //             frames[i].title = frames[i].src;
        //             frames[i].src = "";
        //         }
        //         $(this).slideDown(2000, "linear", function () {
        //             replacePlotlyIframe(item2);

        //             // window.PlotlyConfig = { MathJaxConfig: 'local' }; if (window.MathJax && window.MathJax.Hub && window.MathJax.Hub.Config) { window.MathJax.Hub.Config({ SVG: { font: "STIX-Web" } }) }; if (typeof require !== 'undefined') { require.undef("plotly"); requirejs.config({ paths: { 'plotly': ['/scripts/vendor/plotly-gl3d-2.12.1.min'] } }); require(['plotly'], function (a) { window._Plotly = a }) }
        //         });
        //     });
        // });

        $('#mainDiv').load(embedfile, async function () {
            var i, frames;
            frames = item2.getElementsByTagName("iframe");
            for (i = 0; i < frames.length; ++i) {
                frames[i].title = frames[i].src;
                frames[i].src = "";
            }
            replacePlotlyIframe(item2);
        });


    });
};

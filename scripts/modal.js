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

        $('#mainDiv').slideUp(1000, function () {
            // $('#replaceDiv').load(embedfile).ready(function () {
            //     $('#replaceDiv').slideDown(2000, "linear");
            // });
            $('#replaceDiv').load(embedfile, async function () {
                $(this).slideDown(2000, "linear", function () {
                    window.PlotlyConfig = { MathJaxConfig: 'local' }; if (window.MathJax && window.MathJax.Hub && window.MathJax.Hub.Config) { window.MathJax.Hub.Config({ SVG: { font: "STIX-Web" } }) }; if (typeof require !== 'undefined') { require.undef("plotly"); requirejs.config({ paths: { 'plotly': ['/scripts/vendor/plotly-gl3d-2.12.1.min'] } }); require(['plotly'], function (a) { window._Plotly = a }) }
                });
            });
        });

        $('.dark-switch').toggle("slide:right");
    });
};
requirejs.config({
    paths: {
        "jquery": "jquery",
        "bootstrap": "bootstrap.bundle.min",
        // "plotly": "vendor/plotly-gl3d-2.12.1.min"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

// require(["bootstrap"], function ($) {
//     console.log("Loaded bootstrap...");
// });
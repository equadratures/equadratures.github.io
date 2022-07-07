// Functions to toggle dark mode
function darkFunction() {
    document.body.classList.toggle("dark-mode");

    var item = document.getElementById('navbar');
    item.classList.toggle("navbar-light");
    item.classList.toggle("navbar-dark");
    item.classList.toggle("bg-light");
    item.classList.toggle("bg-dark");

    element = document.getElementsByClassName('card-body');
    for (var i = 0; i < element.length; ++i) {
        var item = element[i];
        item.classList.toggle("dark-mode");
    }

    var jp_dark = document.getElementById('jupyter_dark');
    var jp_light = document.getElementById('jupyter_light');

    jp_light.disabled = !jp_light.disabled;
    jp_dark.disabled = !jp_light.disabled;

}

function checkDarkMode() {
    requirejs(["jquery"], function () {
        var mode = localStorage.getItem('dark-mode');
        if (mode === 'false') {
            darkFunction();
        }
    });
};

// window.onpaint = checkDarkMode();

// document.addEventListener('DOMContentLoaded', (event) => {
//     checkDarkMode();
// });

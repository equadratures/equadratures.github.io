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
}

function checkDarkMode() {
    // console.log(localStorage.getItem('dark-mode'));
    if (localStorage.getItem('dark-mode') === 'false') {
        darkFunction();
    }
};

// window.onpaint = checkDarkMode();

// document.addEventListener('DOMContentLoaded', (event) => {
//     checkDarkMode();
// });

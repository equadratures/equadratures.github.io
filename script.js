// Functions to toggle dark mode
function darkFunction() {
    var item = document.getElementById('navbar');
    item.classList.toggle("navbar-light");
    item.classList.toggle("navbar-dark");
    item.classList.toggle("bg-light");
    item.classList.toggle("bg-dark");
    var element = document.body;
    element.classList.toggle("dark-mode");

    element = document.getElementsByClassName('card-body');
    for (var i = 0; i < element.length; ++i) {
        var item = element[i];
        item.classList.toggle("dark-mode");
    }
}

$(window).on('load', () => {
    if (localStorage.getItem('dark-mode') === 'false') {
        darkFunction();
    }
});

$('.dark-switch').on('click', () => {
    let $body = $('body');
    let $cardbody = $('card-body');
    if ($body.hasClass("dark-mode")) {
        localStorage.setItem('dark-mode', 'false');
        darkFunction();
    } else {
        localStorage.setItem('dark-mode', 'true');
        darkFunction();
    }
});
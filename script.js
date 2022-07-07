function darkSwitch() {
    let body = document.body;
    darkFunction();
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
    var item2 = document.getElementById('replaceDiv');
    replacePlotlyIframe(item2);
}
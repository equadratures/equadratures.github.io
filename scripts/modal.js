var goToModal = function (value) {
    requirejs(["jquery", "bootstrap"], function () {
        var embedfile;
        var modal = $(value);
        if (localStorage.getItem('dark-mode') === 'true') {
            embedfile = modal.attr("dark");
        }
        else {
            embedfile = modal.attr("light");
        }

        $('#mainDiv2').slideUp(0);

        var item = document.getElementById('mainDiv');
        item.classList.toggle("container");
        item.classList.toggle("infocontainer");
        var item2 = document.getElementById('mainDiv2');

        $('#mainDiv').slideUp(1000, function () {
            $('#mainDiv2').load(embedfile, function () {
                $(this).slideDown(2000, "linear");
            });
        });

        $('.dark-switch').toggle("slide:right");
    });
};
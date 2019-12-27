// Wyłącz klase sticky gdy okno węższe niż 991
$(window).on('resize', function() {
    var win = $(this);
    if (win.width() < 991) {
        $('nav').removeClass('sticky');}
});

// Przyklejony navbar
$(window).scroll(function() {
    if ($(this).scrollTop() > 80) {
        if ($(window).width() > 991) {
            $('nav').addClass("nav");
            $('nav').addClass("sticky");
        }
    } else {
        $('nav').removeClass("sticky");
    }
});


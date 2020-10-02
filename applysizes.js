// Doing some stuff for the display of the element to be nice
function applySizes() {
    var eltHeight = $('.element').height();
    $('.element').css('width', 17 * eltHeight / 20 + 'px');

    $('.number').css('font-size', 5 * eltHeight / 32 + 'px');
    $('.letter').css('font-size', 1 * eltHeight / 2 + 'px');
    $('.name').css('font-size', 3 * eltHeight / 32 + 'px');
    $('.atomicmass').css('font-size', eltHeight / 8 + 'px');

    $('.number').css('height', 5 * eltHeight / 64 + 'px');
    $('.letter').css('height', 1 * eltHeight / 2 + 'px');
    $('.name').css('height', 3 * eltHeight / 32 + 'px');
    $('.atomicmass').css('height', eltHeight / 8 + 'px');

    $('.name').css('margin-bottom', 1 * eltHeight / 64 + 'px');
    $('.letter').css('margin-bottom', 5 * eltHeight / 32 + 'px');
}

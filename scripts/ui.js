$('.clear').click(clearScreen);

$('.save').click(function() {
    window.open(canvas.toDataURL(), '_blank');
});
$('.pause').click(function() {
    var $this = $(this),
        thisText = $this.text(),
        state = $(rods).css('animation-play-state');

    if (state === 'paused') {
        playAnim();
        $this.text('pause');
    } else {
        pauseAnim();
        $this.text('run');
    }
});
$(".controls").draggable({
    addClasses: false,
    snap: "body" 
});
$spinners = $('.spinner').spinner();

$("#rodOpacitySlider")
    .slider({
        value: 99,
        orientation: "vertical"
    })
    .on('slide slidechange', function() {
        $('.a').css({
            'opacity': $(this).slider('value') / 100
        });
    });

$('input[type="color"]')
    .on('change', function() {
        linecolor = $(this).val();
    });

$spinners
    .on('spinstop', function() {
        var $this = $(this),
            newRevTime = $this.val(),
            thisId = $this.attr('id')[5];

        changeAnimTime(thisId, newRevTime);
    });

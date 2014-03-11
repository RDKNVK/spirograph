var $canvas = $('canvas'),
    canvas = $canvas[0],
    ctx = canvas.getContext('2d'),
    last = {
        x: null,
        y: null
    },
    linecolor = $('input[type="color"]').val(),
    rods = '.a, .b, .c',
    animVals = $('.a').css('animation').split(' '),
    paused = false;

setupCanvas();
$(window).resize(setupCanvas);

function setupCanvas() {
    pauseAnim();
    var $wind = $(window),
        w = $wind.width(),
        h = $wind.height();

    $canvas
        .attr('width', w)
        .attr('height', h);
    $(rods).height((w < h ? w : h) / 6 - 30);
    clearScreen();
    playAnim();
}

function pauseAnim() {
    $(rods).css('animation-play-state', 'paused');
    paused = true;
    $('.pause').text('run');
}

function playAnim() {
    $(rods).css('animation-play-state', 'running');
    paused = false;
    $('.pause').text('pause');
}

function changeAnimTime(rod, seconds) {
    var newAnVals = animVals.join(' ');
    pauseAnim();
    animVals[1] = seconds + 's';
    $('.' + rod).css({
        '-webkit-animation': newAnVals,
        'animation': newAnVals
    });
    resetElem('.' + rod);
    playAnim();
    clearScreen();
}

function draw(x, y) {
    //ctx.strokeStyle = "rgb(250,0,0)";
    ctx.strokeStyle = linecolor;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);

    if (last.x)
        ctx.lineTo(x, y);

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    last = {
        x: x,
        y: y
    };
}

function clearScreen() {
    ctx.clearRect(0, 0, 9999, 9999);
    //window.setTimeout(ctx.clearRect(0, 0, 9999, 9999), 1500);
}

function render() {
    var p;
    if (!paused) {
        p = $('.draw').offset();
        draw(p.left, p.top);
    }
    window.requestAnimationFrame(render);

}
window.requestAnimationFrame(render);

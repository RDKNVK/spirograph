var ctx = $('canvas')[0].getContext('2d'),
    last = {
        x: null,
        y: null
    },
    linecolor = $('input[type="color"]').val(),
    $rods = $('.a, .b, .c');

setupCanvas();
$(window).resize(setupCanvas);

function setupCanvas() {
    var w = $(window).width(),
        h = $(window).height();

    $('canvas')
        .attr('width', w)
        .attr('height', h);

    $rods.height((w < h ? w : h) / 6 - 20);
    //console.log(w,h);
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
function render() {
    var p = $('.draw').offset();
    draw(p.left, p.top);
    window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

function clearScreen() {
    ctx.clearRect(0, 0, 9999, 9999);
    window.setTimeout(ctx.clearRect(0, 0, 9999, 9999), 1500);
}

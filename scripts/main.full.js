// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// http://css-tricks.com/restart-css-animation/

function resetElem(sel) {
 var el = $(sel),  
 newone = el.clone(true);
 el.before(newone);
 $("." + el.attr("class") + ":last").remove();
}
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

$('.clear').click(clearScreen);
$('.spinner').spinner();

$('.spinner')
    .on('spinstop', function() {
        var $this = $(this),
            newRevTime = $this.val(),
            p = $this.attr('id')[5],
            astr = $('.a').css('-webkit-animation').split(' ');

        //console.log($this);
        astr[1] = newRevTime + 's';

        $('.' + p).css({
            '-webkit-animation': astr.join(' ')
        });
        resetElem('.' + p);
        
        clearScreen();
    });

$('input[type="color"]')
    .on('change', function() {
        linecolor = $(this).val();
    });


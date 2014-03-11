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

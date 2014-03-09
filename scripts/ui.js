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


const names = ['House Stark','House Bronn','House Arryn','House Baratheon','House Greyjoy','House Lannister','House Tully','House Martell'];
var $select = $('ul.friends_Select');
$.each(names,function (index, value) {
    var $li = $("<li class='slide-nav-btn' value="+index+">"+value+"</li>");
    $select.append($li);
});

$("ul.friends_Select").on("click", ".init", function() {
    $(this).closest("ul.friends_Select").children('li:not(.init)').toggle();
});

var allOptions = $("ul.friends_Select").children('li:not(.init)');
$("ul.friends_Select").on("click", "li:not(.init)", function() {
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $("ul.friends_Select").children('.init').html($(this).html());
    allOptions.toggle();
});

let slideNow = 1;
let navBtnId = 0;
let translateWidth = 0;

$(document).ready(function() {
    $('.slide-nav-btn').click(function() {
        navBtnId = $(this).index()-1;

        if (navBtnId + 1 !== slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'overflow':'hidden',
                'transform': 'translate(' + translateWidth+ 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});


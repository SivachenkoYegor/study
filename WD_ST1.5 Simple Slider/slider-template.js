const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];
let indexNow = 0;
$.each(IMAGES, function (index, link) {
        $('#slider ul').append(
            $('<li>').append(
                $('<img>').attr('src', API_URL + SMALL_SIZE + link)
            )
        )
    }
);
$('#slider ul li').click(function () {
    $('.current').removeClass("current");
    indexNow = $(this).index();
    $('.slider-current').empty().append(
        $('<img>').attr('src', API_URL + BIG_SIZE + IMAGES[indexNow])
    );
    $(this).attr('class', 'current');
});
$("html").on("keydown", function (event) {
        switch (event.which) {
            case 37:
                if (indexNow === 0) {
                    indexNow = 5;
                } else {
                    indexNow -= 1;
                }
                showCurrentImage(indexNow);
                break;
            case 39:
                if (indexNow + 1 === IMAGES.length) {
                    indexNow = 0;
                } else {
                    indexNow += 1;
                }
                showCurrentImage(indexNow);
                break;
        }
    }
);

function showCurrentImage(index) {
    $('.current').removeClass("current");
    $('.slider-current').empty().append(
        $('<img>').attr('src', API_URL + BIG_SIZE + IMAGES[index])
    );
    $('#slider ul li').eq(index).attr('class', 'current');
}
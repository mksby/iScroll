var count = 0;

$('.wrap').iScroll(function(positionScroll, positionText, directionMove) {
  var $text = $(this).data('$text');

  console.log(positionScroll, positionText, directionMove)

  if (directionMove === 'down' && positionScroll.percent > 80) {
    $text.find('ul').append($('<li>add_'+(count++)+': Lorem ipsum dolor sitr autem.</li>'))
  }
});

$('.wrap-h').iScroll({
  direction: 'horizontal'
})

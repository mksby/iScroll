var flag = true,
count = 0;

$('.wrap').iScroll(function(positionScroll, positionText) {

  var $minText = $(this).data('$minText'),
      $scroll = $(this).data('$scroll'),
      $scrollArea = $(this).data('$scrollArea'),
      $text = $(this).data('$text');

  if (positionScroll.percent > 80 && flag) {
    // flag = false;
    $text.find('ul').append($('<li>add_'+(count++)+': <div>Lorem ipsum dolor sit ameadipiptatibus doloribus magni corrupti inventore maiores expedita vitae pariatur voluptates possimus sunt laborum ratione aspernatur quaerat illo aliquam itaque error atque deleniti reiciendis facere qui.</div><div>Nesciunt, natus, dolorum dolores neque odit earum tempore enim adipisci accusantium iusto esse nulla. Provident, aut, cupiditate, laborum, assumenda tempore ipsum consequatur eligendi cumque velit numquam a aspernatur similique repellendus?</div><div>Reiciendis accusamus dolorem at perspiciatis iure voluptates. Nostrum, dolore sapiente distinctio ea pariatur ipsa quas? Libero, esse doloribus impedit aspernatur autem velit ab est animi ipsum officiis cum atque tempore!</div><div>Omnis, ab iste cum quam rerum molestias illo dicta delectus voluptatum culpa obcaecati excepturi magni doloremque assumenda maiores commodi totam enim corrupti tenetur dolor alias itaque soluta non quidem a.</div> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, facilis, consequuntur deserunt velit dicta temporibus quos! Obcaecati, adipisci consequuntur aliquam placeat necessitatibus consectetur autem. Tenetur explicabo voluptates deserunt sit nam.</li>'))
  }

});

// $('.wrap-h').iScroll({
//     direction: 'horizontal',
//     text: 'iscroll__text',
//     minText: 'iscroll__text_min',
//     scrollArea: 'iscroll__bt',
//     scroll: 'iscroll__bt_drag'
// }, function(topPosition) {
//     console.log(topPosition)
// }).iScrollTop(':end');

# Lazy iScroll + iScrollTop

Simple vertical/horizontal custom scroll with over plugin for autoscrolling end to end or to subelement.

## Usage
``` Javascript
$('.wrap').iScroll(function(positionScroll, positionText, directionMove) {
  var $text = $(this).data('$text');

  if (directionMove === 'down' && positionScroll.percent > 80) {
    $text.find('ul').append($('<li>Lorem ipsum dolor sitr autem.</li>'))
  }
}).iScrollTop('.point', function(status) {
  if (!status.done) return;

  $(this).iScrollTop(':start')
});
```

## API

`.iScroll(params [, callback])`

1. **params:** object, *not required*
    * **direction,** string, *not required*, can be vertical or horizontal, default is `vertical`
    * **text,** string, *not required*, full text content selector, default is `iscroll__text`
    * **minText,** string, *not required*, wrapper of text content selector, default is `iscroll__text_min` 
    * **scrollArea,** string, *not required*, background of scroll selector, default is `iscroll__bt` 
    * **scroll,** string, *not required*, scroll selector, default is `iscroll__bt_drag` 
2. **callback:** function, *not required*, context is wrapper element
    * **positionScroll,** object
        * **pixel,** interger, pixel from top or left
        * **percent,** interger, percent from top or left
    * **positionText,** object
        * **pixel,** interger, pixel from top or left
        * **percent,** interger, percent from top or left
    * **directionMove,** string, can be up or down

`.iScrollTop(selector [, needAnimate][, callback])`, must be called from the wrapper

1. **selector:** string, *required*, can be pseudo selector :start/:end
2. **needAnimate:** boolean, *not required*, includes animate (default is true)
3. **callback:** function, *not required*, context is wrapper element
    * **done,** boolean, has been successfully completed?!
    * **description,** string, description of status

## Browser Support
* Chrome 31+
* Firefox 24+
* IE 8+
* Opera 12+
* Safari 5+
/* iScroll plugin */

;(function(window, document) {
    'use strict';

    var getType = function(element, nameType) {
        var type = Object.prototype.toString.call(element).slice(8, -1);
        return {
            isValid: type === nameType,
            getActual: type
        }
    };

    var moveText = {
        vertical: function($wrap, $text, $minText, $scrollArea, $scroll, callback) {
            var originalScrollTop = parseInt($scroll.css('top')),
                maxScrollTop = $scrollArea.outerHeight(true) - $scroll.outerHeight(true),
                newScrollTop;

            if (originalScrollTop < 0) {
                newScrollTop = 0;
            } else if (originalScrollTop > maxScrollTop) {
                newScrollTop = maxScrollTop;
            } else {
                newScrollTop = originalScrollTop;
            };

            $scroll.css('top', newScrollTop);

            var diffTextBoxes = $text.outerHeight(true) - $minText.outerHeight(true),
                diffScrollBoxes = $scrollArea.outerHeight(true) - $scroll.outerHeight(true);

            var newTopText = diffTextBoxes / diffScrollBoxes * newScrollTop;

            $text.css('top', -newTopText);
            callback.call($wrap, {
                pixel: newScrollTop,
                percent: newScrollTop / maxScrollTop * 100
            }, {
                pixel: 0 - newTopText,
                percent: newTopText / diffTextBoxes * 100
            });
        },
        horizontal: function($wrap, $text, $minText, $scrollArea, $scroll, callback) {
            var originalScrollLeft = parseInt($scroll.css('left')),
                maxScrollLeft = $scrollArea.outerWidth(true) - $scroll.outerWidth(true),
                newScrollLeft;

            if (originalScrollLeft < 0) {
                newScrollLeft = 0;
            } else if (originalScrollLeft > maxScrollLeft) {
                newScrollLeft = maxScrollLeft;
            } else {
                newScrollLeft = originalScrollLeft;
            };

            $scroll.css('left', newScrollLeft);

            var diffTextBoxes = $text.outerWidth(true) - $minText.outerWidth(true),
                diffScrollBoxes = $scrollArea.outerWidth(true) - $scroll.outerWidth(true);

            var newLeftText = diffTextBoxes / diffScrollBoxes * newScrollLeft;
            $text.css('left', -newLeftText);
            callback.call($wrap, {
                pixel: newScrollLeft,
                percent: newScrollLeft / maxScrollLeft * 100
            }, {
                pixel: 0 - newLeftText,
                percent: newLeftText / diffTextBoxes * 100
            });
        }
    };

    $.extend($.fn, {
        iScroll: function(params, callback) {
            if ($(this).length > 1) {
                return $(this).each(function(index, element) {
                    $.fn.iScroll.call($(element), params)
                });
            };

            var _callback = getType(params, 'Function').isValid && params || getType(callback, 'Function').isValid && callback || $.noop();

            var $wrap = $(this),
                $text = $('.' + (getType(params, 'Object').isValid && params.text || 'iscroll__text'), this),
                $minText = $('.' + (getType(params, 'Object').isValid && params.minText || 'iscroll__text_min'), this),
                $scrollArea = $('.' + (getType(params, 'Object').isValid && params.scrollArea || 'iscroll__bt'), this),
                $scroll = $('.' + (getType(params, 'Object').isValid && params.scroll || 'iscroll__bt_drag'), this),
                direction = getType(params, 'Object').isValid && params.direction || 'vertical',
                arrayElements = [$wrap, $text, $minText, $scrollArea, $scroll, _callback];

            var setHeightScroll = {
                vertical: function() {
                    var heightScroll = $minText.outerHeight(true) / $text.outerHeight(true) * $scrollArea.outerHeight(true);
                    $scroll.css('height', heightScroll)
                },
                horizontal: function() {
                    var widthScroll = $minText.outerWidth(true) / $text.outerWidth(true) * $scrollArea.outerWidth(true);
                    $scroll.css('width', widthScroll)
                }
            };

            var setEvents = {
                vertical: function() {
                    $wrap.on('mousewheel MozMousePixelScroll', function(event) {
                        var step = ($scrollArea.height() - $scroll.height()) / ($text.outerHeight(true) / $minText.outerHeight(true) * 10);

                        if (event.type === 'mousewheel') {
                            $scroll.css('top', event.originalEvent.wheelDelta >= 0 ? '-=' + step : '+=' + step);
                        } else {
                            $scroll.css('top', event.originalEvent.detail <= 0 ? '-=' + step : '+=' + step);
                        };

                        var beforeHeightScroll = $scroll.outerHeight(true);

                        moveText[direction].apply($wrap, arrayElements);
                        setHeightScroll[direction]();

                        if (beforeHeightScroll - $scroll.outerHeight(true) !== 0) {
                            var newPosScroll = Math.abs(parseInt($text.css('top'))) / (($text.outerHeight(true) - $minText.outerHeight(true)) / ($scrollArea.outerHeight(true) - $scroll.outerHeight(true)));
                            $scroll.css('top', newPosScroll);
                        }

                        event.preventDefault();
                    });

                    $scroll.on('mousedown', function(event) {
                        var originalScrollTop = event.pageY - parseInt($(this).css('top') || 0);

                        $(document.body).on('mousemove.iScroll', function(event) {
                            $scroll.css('top', event.pageY - originalScrollTop);
                            moveText[direction].apply($wrap, arrayElements);
                        });

                        return false;
                    });

                    return this;
                },
                horizontal: function() {

                    $wrap.on('mousewheel MozMousePixelScroll', function(event) {
                        var step = ($scrollArea.width() - $scroll.width()) / ($text.outerWidth(true) / $minText.outerWidth(true) * 10);

                        if (event.type === 'mousewheel') {
                            $scroll.css('left', event.originalEvent.wheelDelta >= 0 ? '-=' + step : '+=' + step);
                        } else {
                            $scroll.css('left', event.originalEvent.detail <= 0 ? '-=' + step : '+=' + step);
                        };

                        var beforeWidthScroll = $scroll.outerWidth(true);

                        moveText[direction].apply($wrap, arrayElements);
                        setHeightScroll[direction]();

                        if (beforeWidthScroll - $scroll.outerWidth(true) !== 0) {
                            var newPosScroll = Math.abs(parseInt($text.css('left'))) / (($text.outerWidth(true) - $minText.outerWidth(true)) / ($scrollArea.outerWidth(true) - $scroll.outerWidth(true)));
                            $scroll.css('left', newPosScroll);
                        }

                        event.preventDefault();
                    });

                    $scroll.on('mousedown', function(event) {
                        var originalScrollLeft = event.pageX - parseInt($(this).css('left') || 0);

                        $(document.body).on('mousemove.iScroll', function(event) {
                            $scroll.css('left', event.pageX - originalScrollLeft);
                            moveText[direction].apply($wrap, arrayElements);
                        });

                        return false;
                    });

                    return this;
                },
                global: function() {

                    $(document.body).on('mouseup', function() {
                        $(this).off('mousemove.iScroll')
                    });

                    return this;
                }
            }

            var init = function() {
                $.extend($wrap.data(), {
                    direction: direction,
                    $scrollArea: $scrollArea,
                    $scroll: $scroll,
                    $text: $text,
                    $minText: $minText
                });
                setHeightScroll[direction]();
                setEvents[direction]().global();
            };

            init();

            return $(this);
        },
        iScrollTop: function(selector, callback) {

            if ($(this).length > 1) {
                return $(this).each(function(index, element) {
                    $.fn.iScrollTop.call($(element), selector, callback)
                });
            };

            var $wrap = $(this),
                direction = $(this).data('direction'),
                $item = $(selector),
                isPseudoSelector = selector.indexOf(':') === 0;

            if (!isPseudoSelector && $item.length < 1) {
                callback && callback.call($wrap, {
                    done: false,
                    description: 'Element not found. Selector: ' + selector
                })
                return $wrap
            }

            var $text = $wrap.data('$text'),
                $minText = $wrap.data('$minText'),
                $scrollArea = $wrap.data('$scrollArea'),
                $scroll = $wrap.data('$scroll'),
                arrayElements = [$text, $minText, $scrollArea, $scroll],
                newTopPosition, speedAnimate, ANIMATESTEP = 4;

            if (direction === 'vertical') {

                if (isPseudoSelector) {
                    if (selector === ':start') newTopPosition = 0;
                    if (selector === ':end') newTopPosition = $text.height() - $minText.height();
                } else {
                    newTopPosition = $item.position().top
                };

                var ratioTextBoxes = newTopPosition / $text.height(),
                    newScrollPosition = $scrollArea.height() * ratioTextBoxes,
                    newCSS = {
                        top: newScrollPosition
                    };

                speedAnimate = Math.abs(newScrollPosition - parseInt($scroll.css('top'))) * ANIMATESTEP;

            } else if (direction === 'horizontal') {

                if (isPseudoSelector) {
                    if (selector === ':start') newTopPosition = 0;
                    if (selector === ':end') newTopPosition = $text.width() - $minText.width();
                } else {
                    newTopPosition = $item.position().left
                };

                var ratioTextBoxes = newTopPosition / $text.width(),
                    newScrollPosition = $scrollArea.width() * ratioTextBoxes,
                    newCSS = {
                        left: newScrollPosition
                    };

                speedAnimate = Math.abs(newScrollPosition - parseInt($scroll.css('left'))) * ANIMATESTEP;
            };

            $scroll.animate(newCSS, {
                duration: speedAnimate,
                progress: function() {
                    moveText[direction].apply($wrap, arrayElements)
                },
                done: function() {
                    callback && callback.call($wrap, {
                        done: true,
                        description: 'End animate to ' + selector + ' element.'
                    });
                }
            });

            return $(this);
        }
    });
}(this, this.document));
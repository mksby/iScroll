$('.wrap').iScroll().iScrollTop('.point', function(status) {
	if (!status.done) return;

	$(this).iScrollTop(':start')

});

$('.wrap-h').iScroll({
	direction: 'horizontal',
	text: 'iscroll__text',
	minText: 'iscroll__text_min',
	scrollArea: 'iscroll__bt',
	scroll: 'iscroll__bt_drag'
}).iScrollTop(':end');
function Scroll(){
    $.extend(this, arguments[0]);
    this.init();
};

$.extend(Scroll.prototype, {
    init: function(){
        this.firstFire();
        this.events();
    },
    firstFire: function(){
        this.scroll.css({
            height: function(){
                var percentVisibleText = this.wrapperText.outerHeight(true)/(this.fullText.outerHeight(true)-this.wrapperText.outerHeight(true));
                return this.areaScroll.outerHeight(true)*percentVisibleText
            }.call(this)
        })
    },
    update: function(){
        this.scroll.css({
            top: $.proxy(function(i,val){
                var val = parseInt(val), maxTop = this.areaScroll.outerHeight(true)-this.scroll.outerHeight(true);
                if(val < 0) {
                    return 0
                } else if(val > maxTop) {
                    return maxTop
                }
            },this)
        });
        var val = (this.fullText.outerHeight(true)-this.wrapperText.outerHeight(true))/(this.areaScroll.outerHeight(true)-this.scroll.outerHeight(true))*parseInt(this.scroll.css('top'));
        this.fullText.css('top', -val);
    ,
    events: function(){
        this.scroll.on({
            mousedown: function(e){
                var startScrollPosition = e.pageY-parseInt($(this).css('top') || 0);
                $(document).mousemove($.proxy(function(e){
                    $(this).css('top', e.pageY-startScrollPosition).trigger('checkAllItems');
                },this))
                return false;
            },
            'checkAllItems': $.proxy(function(){
                this.update();
            },this)
        });

        $(document).mouseup(function(){
            $(this).off('mousemove');
        });

        this.wrapperText.on('mousewheel MozMousePixelScroll', $.proxy(function(e){
            if (e.type === 'mousewheel') {
                this.scroll.css('top',e.originalEvent.wheelDelta >= 0? '-=20': '+=20').trigger('checkAllItems');
            } else {
                this.scroll.css('top',e.originalEvent.detail <= 0? '-=20': '+=20').trigger('checkAllItems');
            };
            e.preventDefault();
        },this));
    }
})

var scroll = new Scroll({
    fullText: $('.text', '.textwrp._first'),
    wrapperText: $('.textwrp._first'),
    areaScroll: $('.bgpol', '.textwrp._first'),
    scroll: $('.pol', '.textwrp._first')
});

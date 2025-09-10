(function ($) {
    $.fn.cascadeSlider = function (opt) {
        var $this = this,
            itemClass = opt.itemClass || 'cascade-slider_item',
            arrowClass = opt.arrowClass || 'cascade-slider_arrow',
            $item = $this.find('.' + itemClass),
            $arrow = $this.find('.' + arrowClass),
            itemCount = $item.length;

        var defaultIndex = 0;

        changeIndex(defaultIndex);

        $arrow.on('click', function () {
            var action = $(this).data('action'),
                nowIndex = $item.index($this.find('.now'));

            if (action == 'next') {
                changeIndex((nowIndex + 1) % itemCount);
            } else if (action == 'prev') {
                changeIndex((nowIndex - 1 + itemCount) % itemCount);
            }
        });

        // Her bir öğeye tıklanınca merkezde olmasını sağla
        $item.on('click', function () {
            var clickedIndex = $item.index(this);
            changeIndex(clickedIndex);
        });

        function changeIndex(nowIndex) {
            // Tüm sınıfları temizle
            $this.find('.now, .next, .prev, .prePrev, .preNext').removeClass('now next prev prePrev preNext');

            $item.eq(nowIndex).addClass('now');
            $item.eq((nowIndex + 1) % itemCount).addClass('next');
            // $item.eq((nowIndex + 2) % itemCount).addClass('preNext');
            $item.eq((nowIndex - 1 + itemCount) % itemCount).addClass('prev');
            // $item.eq((nowIndex - 2 + itemCount) % itemCount).addClass('prePrev');
        }
    };
})(jQuery);

$('#cascade-slider').cascadeSlider({
    itemClass: 'cascade-slider_item',
    arrowClass: 'cascade-slider_arrow'
});

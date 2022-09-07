const slider = $('.products').bxSlider({
  pager: false,
  controls: false,
  wrapperClass: 'bx-slider'
});

$('.products-slider__arrow_prev').on('click', e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$('.products-slider__arrow_next').on('click', e => {
  e.preventDefault();
  slider.goToNextSlide();
});
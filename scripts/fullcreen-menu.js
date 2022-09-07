const fullscreenMenu = $('.fullscreen-menu');
const menuItems = fullscreenMenu.find('.menu__item');

$('.hamburger').on('click', e => {
  e.preventDefault();
  fullscreenMenu.addClass('active');
  $('body').css('overflow', 'hidden');
});

$('.fullscreen-menu__close').on('click', e => {
  e.preventDefault();
  fullscreenMenu.removeClass('active');
  $('body').css('overflow', 'auto');
});

menuItems.on('click', e => {
  e.preventDefault();
  fullscreenMenu.removeClass('active');
  $('body').css('overflow', 'auto');
});
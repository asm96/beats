(function () {
  $('.team__title').on('click', function () {
    const $this = $(this);
    const curItem = $this.closest('.team__item');
    const activeItem = document.querySelector('.team__item.active');
    if (activeItem) {
      activeItem.classList.remove('active');
      const content = activeItem.querySelector('.team__content');
      content.style.height = '0px';
    }
    if (!activeItem || activeItem.querySelector('.team__title') != this) {
      curItem.addClass('active');
      const content = curItem.find('.team__content');
      const contentHeight = content.prop('scrollHeight');
      content.height(contentHeight + 'px');
    }
  });
})()
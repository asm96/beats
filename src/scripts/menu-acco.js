(function () {
  const measureWidth = item => {
    const screenWidth = $(window).width();
    const container = item.closest('.products-menu');
    const titlesBlocks = container.find('.products-menu__title');
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let reqItemsWidth = isMobile ? screenWidth - titlesWidth : 524;

    return {
      container: reqItemsWidth,
      textContainer: reqItemsWidth - paddingLeft - paddingRight
    }

  }

  const closeEveryItemInContainer = container => {
    const items = container.find('.products-menu__item');
    const content = container.find('.products-menu__content');

    items.removeClass('active');
    content.width(0);
  };

  const openItem = item => {
    const hiddenContent = item.find('.products-menu__content');
    const textContainer = item.find('.products-menu__container');
    const reqWidth = measureWidth(item);

    item.addClass('active');
    hiddenContent.width(reqWidth.container);
    textContainer.width(reqWidth.textContainer);
  };

  $('.products-menu__title').on('click', e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest('.products-menu__item');
    const itemOpened = item.hasClass('active');
    const container = item.closest('.products-menu');

    if (itemOpened) {
      closeEveryItemInContainer(container);
    } else {
      closeEveryItemInContainer(container);
      openItem(item);
    }
  });
})()
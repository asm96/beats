(function () {
  const sections = $('.section');
  const display = $('.main');
  const sideMenu = $('.fixed-menu');
  const menuItems = sideMenu.find('.fixed-menu__item');
  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  let inScroll = false;

  sections.first().addClass('active');

  const countSelectionPosition = sectionEq => {
    const position = sectionEq * -100;
    if (isNaN(position)) {
      console.error('передано не верное значение в countSelectionPosition');
      return 0;
    }
    return position;
  };

  const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr('data-sidemenu-theme');
    const activeClass = 'light';
    menuTheme == activeClass ? sideMenu.addClass(activeClass) : sideMenu.removeClass(activeClass);
  };

  const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
  };

  const performTransition = sectionEq => {
    if (inScroll) return;

    inScroll = true;
    const transitionOver = 1000;
    const mouseInertiaOver = 300;
    const position = countSelectionPosition(sectionEq);

    display.css('transform', `translateY(${position}%)`);

    changeMenuThemeForSection(sectionEq);
    resetActiveClassForItem(sections, sectionEq, 'active');

    setTimeout(() => {
      inScroll = false;
      resetActiveClassForItem(menuItems, sectionEq, 'active');
    }, transitionOver + mouseInertiaOver);
    // display.on('transitionend', () => {
    //   inScroll = false;
    //   resetActiveClassForItem(menuItems, sectionEq, 'active');
    // });
  };

  const viewportScroller = () => {
    const activeSection = sections.filter('.active');
    const prevSection = activeSection.prev();
    const nextSection = activeSection.next();

    return {
      next() {
        if (nextSection.length) {
          performTransition(nextSection.index());
        }
      },
      prev() {
        if (prevSection.length) {
          performTransition(prevSection.index());
        }
      }
    }
  };

  $(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
      scroller.next();
    }

    if (deltaY < 0) {
      scroller.prev();
    }
  });

  $(window).on('keydown', e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName == 'input' || tagName == 'textarea';
    const scroller = viewportScroller();

    if (userTypingInInputs) return;
    switch (e.originalEvent.key) {
      case 'ArrowDown':
        scroller.next();
        break;
      case 'ArrowUp':
        scroller.prev();
        break;
    }
  });

  $('.wrapper').on('touchmove', e => { e.preventDefault(); });

  $('[data-scroll-to]').on('click', e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
  });

  if (isMobile) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe({
      swipe(e, direction) {
        const scroller = viewportScroller();
        let scrollDirection = '';
        if (direction == 'up') scrollDirection = 'next';
        if (direction == 'down') scrollDirection = 'prev';
        scroller[scrollDirection]();
      }
    });
  }

})()
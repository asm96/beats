(function () {
  const modal = $('.modal');

  function validateFields(form, fields) {
    fields.forEach(field => {
      field.removeClass('input-error');
      if (field.val().trim() == '') {
        field.addClass('input-error');
      }
    })

    const errorFields = form.find('.input-error');
    return errorFields.length == 0;
  }

  $('.form').on('submit', function (e) {
    e.preventDefault();

    const form = $(this);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const street = form.find("[name='street']");
    const house = form.find("[name='house']");
    const building = form.find("[name='building']");
    const apt = form.find("[name='apartment']");
    const floor = form.find("[name='floor']");
    const comment = form.find("[name='comment']");
    const payment = form.find("[name='payment']");
    const dontCall = form.find("[name='dontcall']");
    const to = form.find("[name='to']");
    const content = modal.find('.modal__content');

    modal.removeClass('error-modal');
    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
      const request = $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
          name: name.val(),
          phone: phone.val(),
          street: street.val(),
          house: house.val(),
          building: building.val(),
          apt: apt.val(),
          floor: floor.val(),
          payment: payment.val(),
          dontcall: dontCall.prop('checked'),
          comment: comment.val(),
          to: to.val(),
        }
      });
      request.done(data => {
        content.text(data.message);
        form.trigger('reset');
      });
      request.fail(data => {
        if (data.responseJSON) {
          const message = data.responseJSON.message;
          content.text(message);
        } else {
          content.text('Ошибка');
        }
        modal.addClass("error-modal");
      });
      request.always(() => {
        modal.addClass('active');
        $('body').css('overflow', 'hidden');
      });
    }
  });

  $('.app-submit-btn').on('click', e => {
    e.preventDefault();
    modal.removeClass('active');
    $('body').css('overflow', 'auto');
  });
})()
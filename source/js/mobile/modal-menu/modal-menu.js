var btnMenu = $('.top-menu__button img');
var classModalMenu = $('.modal-menu');

btnMenu.on('click', function(e) {
  e.preventDefault();
  var srcImg =
    $(this).attr('src') === './static/images/mobile/svg/top-menu/menu.svg'
      ? './static/images/mobile/svg/mobile-menu/menu-close.svg'
      : './static/images/mobile/svg/top-menu/menu.svg';
  $(this).attr('src', srcImg);

  if (classModalMenu.hasClass('visual-hidden')) {
    classModalMenu.removeClass('visual-hidden');
    setTimeout(function() {
      classModalMenu.removeClass('hidden');
    }, 20);
  } else {
    classModalMenu.addClass('hidden');
    classModalMenu.addClass('visual-hidden');
  }
});

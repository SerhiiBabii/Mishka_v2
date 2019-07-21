var btnModal = $('.featured__butoon');
var fadeMobileModel = $('.mobile-modal__fade');
var classMobileModal = $('.mobile-modal');

btnModal.on('click', function(e){
	e.preventDefault();
	classMobileModal.slideToggle(400);
});

fadeMobileModel.on('click', function(e){
	e.preventDefault();
	classMobileModal.slideUp(100);
});
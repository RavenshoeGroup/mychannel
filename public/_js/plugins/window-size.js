// JavaScript Document Window Size

$(document).ready(function () {
	    changeMenu();
	$(window).resize(function() {
		changeMenu();
	});
	function changeMenu(){
		if ($(window).width() > 767) {
			$('.dropdown').addClass('myhover');
			$('.dropdown-menu').addClass('myhover-menu');
			$('.hmeMenu').addClass('disabled');	
			
			
		} else {		
			$('.dropdown').removeClass('myhover');
			$('.dropdown-menu').removeClass('myhover-menu');
			$('.hmeMenu').removeClass('disabled');
		}
	}
});

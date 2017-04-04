// JavaScript Document Window Scroll

$(document).ready(function(){
    $(window).scroll(function(){
		var fromTopPx = 50; // distance to trigger
   		var scrolledFromtop = jQuery(window).scrollTop();
          if(scrolledFromtop > fromTopPx){
			   $('.scroll').css('display','none');
			   $('.mobile-link').css('display','block');
			   $('.social-icon').css('padding','0px 0px');
		  }
		  else{
			   $('.scroll').css('display','block');
			   $('.mobile-link').css('display','none');
			   $('.social-icon').css('padding','0px 0px');
		  }
    })
})


// Tool Tip

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $('#popover').popover('hide')
})


// Pop Up Date Info

 $(document).ready(function() {
        //If Javascript is running, change css on product-description to display:block
        //then hide the div, ready to animate
        $("div.pop-up").css({'display':'block','opacity':'0'})

        $("a.trigger").hover(
          function () {
            $(this).prev().stop().animate({
              opacity: 1
            }, 500);
          },
          function () {
            $(this).prev().stop().animate({
              opacity: 0
            }, 200);
          }
        )
      });
	  
	  
$('.day').eq(new Date().getDay()-21).addClass('today');


// Popover

$(function () {
$(".imagepop").css("display","none");
$('[rel=popover]').popover({
    html:true,
    placement:'right',
    content:function(){
        return $($(this).data('popwrapper')).html();
    }
});
});


// Select Menu

function changeVisible(v) {
 if ( v == "other") {
   $(".other-hidden").css("display","block");
   $(".referral-hidden").css("display","none");
   }
 else if (v == "referral") {
   $(".referral-hidden").css("display","block");
   $(".other-hidden").css("display","none");
   }  
 else{
   $(".referral-hidden").css("display","none");
   $(".other-hidden").css("display","none");
	}    
}

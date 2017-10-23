// docs sidebar toggle and url check
var urlcheck = document.getElementsByClassName('expanded')
for(var i = 0, length = urlcheck.length; i < length; i++) {
          urlcheck[i].checked = "true"
}

$(document).ready(function () {
  //video content swap
  $(".video-container").click(function () {
    $(this).append('<iframe src="https://player.vimeo.com/video/226182256?autoplay=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    $('.moveback').addClass('zindexflat');
    $('#icon-play-button, .video-container, .screencast-feature').addClass('videoplay');
  });

  //register email capture form
  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }

  //opens main navigation sidebar
  $('.header-menu-icon').click(function(e){
			e.preventDefault();
			$('body').toggleClass('with-sidebar');
      sidebarpadding()
		});

  // site click back
  $('#site-cache').click(function(e){
    $('body').removeClass('with-sidebar');
  });

  // toc menu
  $('.toc-responsive-menu-icon').click(function(e){
			$('.toc-wrapper').toggleClass('toc-wrapper-height');
      $('body').toggleClass('noscroll');
		});

  $(window).on('resize',sidebarpadding);

  function sidebarpadding(){
    //fix off canvas menu on scroll
     var screenheight = parseInt($(document).height());
     var windowWidth = $( window ).width();
     var scrolledpx = parseInt($("body").scrollTop());
     var sum = screenheight-scrolledpx;
     if(windowWidth <= 960){
       $(".with-sidebar nav.menu").css({
         "margin-top":scrolledpx,
         "height:":screenheight
       });
     } else {
       $("nav.menu").css({
         "margin-top":"0px",
         "height:":"71px"
       });
     }
  }
})
//email capture form details
function register($form) {
  $('#mc-embedded-subscribe').val('Sending...');
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
    success: function (data) {
      $('#mc-embedded-subscribe').val('Subscribe')
      if (data.result === 'success') {
        // Success
        $('#mce-EMAIL').css('borderColor', '#ffffff')
        $('#subscribe-result').html("").removeClass('subscribe-error')
        $('#mc_embed_signup').addClass('subscribe-success')
        $('.subscribe-success').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
        $('#mce-EMAIL').val('')
      } else {
        // Something went wrong, do something to notify the user.
        $('#mce-EMAIL').css('borderColor', '#ff8282')
        $('#subscribe-result').addClass('subscribe-error')
        $('#subscribe-result').html('<p>' + data.msg + '</p>')
      }
    }
  })
};

// docs sidebar toggle and url check
var urlcheck = document.getElementsByClassName('expanded')
for(var i = 0, length = urlcheck.length; i < length; i++) {
          urlcheck[i].checked = "true"
}

$(document).ready(function () {
  //video content swap
  $(".video-container").click(function () {
    $(this).append('<iframe src="https://player.vimeo.com/video/222706185?autoplay=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
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
})

// hljs.initHighlightingOnLoad();

// hljs.configure({useBR: true});
//
// $('.highlighter-rouge').each(function(i, block) {
//   hljs.highlightBlock(block);
// });

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
      $('#mc-embedded-subscribe').val('subscribe')
      if (data.result === 'success') {
        // Success
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ffffff')
        $('#subscribe-result').html("").removeClass('subscribe-error')
        $('#mc_embed_signup').addClass('subscribe-success')
        $('.subscribe-success').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
        $('#mce-EMAIL').val('')
      } else {
        // Something went wrong, do something to notify the user.
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ff8282')
        $('#subscribe-result').addClass('subscribe-error')
        $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
      }
    }
  })
};

//docs sidebar control


// function sticky_relocate() {
//     var window_top = $(window).scrollTop();
//     var footer_top = $(".footer").offset().top;
//     var div_top = $('#sb-sticky-anchor').offset().top;
//     var div_height = $("#sb-sticky").height();
//     var div_height_top = $("#sb-sticky").offset().top;
//
//     var padding = 95;  // tweak here or get from margins etc
//
//     if (window_top + div_height > footer_top - padding)
//         $('#sb-sticky').css({top: (window_top + div_height - footer_top + padding)})
//     else if (window_top > div_top) {
//         $('#sb-sticky').addClass('stick');
//         $('#sb-sticky').css({top: 0})
//     } else {
//         $('#sb-sticky').removeClass('stick');
//     }
// }

// $(function () {
//     $(window).scroll(sticky_relocate);
//     sticky_relocate();
// });

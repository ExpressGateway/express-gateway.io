$(document).ready(function () {

  $(".video-container").click(function () {
    $(this).append('<iframe src="https://player.vimeo.com/video/222706185?autoplay=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    $('.moveback').addClass('zindexflat');
    $('#icon-play-button, .video-container, .screencast-feature').addClass('videoplay');
  });


  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }
})

hljs.configure({useBR: true});

$('.highlighter-rouge').each(function(i, block) {
  hljs.highlightBlock(block);
});

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
        $('#mc_embed_signup').removeClass('subscribe-error')
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

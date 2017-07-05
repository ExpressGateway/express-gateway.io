/**

.sticky {
  position: fixed;
  top: 10px;
  right:18px;
  margin: 0;
  width:calc(33.33% - 25px);
}

.abs {
  position: absolute;
  bottom: 10px;
  right:10px;
  width:calc(33.33% - 20px);
}

**/


// variables
  var topPosition = $('.floating-div').offset().top - 10;
  var floatingDivHeight = $('.floating-div').outerHeight();
  var footerFromTop = $('footer').offset().top;
  var absPosition = footerFromTop - floatingDivHeight - 20;
  var win = $(window);
  var floatingDiv = $('.floating-div');

  win.scroll(function() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if ((win.scrollTop() > topPosition) && (win.scrollTop() < absPosition)) {
        floatingDiv.addClass('sticky');
        floatingDiv.removeClass('abs');

      } else if ((win.scrollTop() > topPosition) && (win.scrollTop() > absPosition)) {
        floatingDiv.removeClass('sticky');
        floatingDiv.addClass('abs');

      } else {
        floatingDiv.removeClass('sticky');
        floatingDiv.removeClass('abs');
      }
    }
  });

$(function(){
  $('a.fade.once').each(function(){
    var delay=$(this).index();
    $(this).css('transition-delay', delay*.5 + 's');
  })

  $('.radio-unfocus .focused-out').click(function(){
    
    var targetHorizontal = $('.main-focus').position().left;
  
    var targetVertical = $('.main-focus').position().top;

    console.log(targetHorizontal)

    console.log($(this).position().left)

    var horizontal = targetHorizontal - $(this).offset().left;
  
    var vertical = targetVertical - $(this).offset().top;
  
    console.log(horizontal + " " + vertical);
  
    $(this).animate({top: vertical + "px", left: horizontal + "px"}, 1500)
  })

})

$(document).on("scroll", function () {
    if(document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
    {
      $(".return-to-top").addClass("visible")
    }
    else{
      $(".return-to-top").removeClass("visible")
    }
  
    var pageTop = $(document).scrollTop()
    var pageBottom = pageTop + $(window).height()
    var tags = $(".fade")
    
    for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]
    
    if ($(tag).position().top < pageBottom) {
    $(tag).addClass("visible")
    } else {
      if(!$(tag).hasClass("once"))
      $(tag).removeClass("visible")
    }
    }
})
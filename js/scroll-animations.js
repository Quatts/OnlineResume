$(document).ready(function(){
  $('a.fade.once').each(function(){
    var delay=$(this).index()
    $(this).css('transition-delay', delay*.5 + 's')
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
$(window).on("load", function () {
  //리사이즈
  var deviceSize = 1024;
  function scrollOX(status) {
    $("html").css({
      overflowY: status,
    });
    return $("html").width();
  }
  var scX = scrollOX("hidden");
  var scO = scrollOX("scroll");
  var scD = scX - scO;
  if (scD > 0) {
    deviceSize = deviceSize - scD;
  }
  var ww = $(window).width();
  if (ww > deviceSize) {
    $("html").addClass("pc");
  } else {
    $("html").addClass("mobile");
  }
  $(window).on("resize", function () {
    let ww = $(window).width();
    if (ww > deviceSize && !$("html").hasClass("pc")) {
      $("html").addClass("pc").removeClass("mobile");
      location.reload();
    } else if (ww <= deviceSize && !$("html").hasClass("mobile")) {
      $("html").addClass("mobile").removeClass("pc");
      location.reload();
    }
  });

  // 헤더 scroll
  $(window).scroll(function () {
    var num = $(this).scrollTop();
    if (num > 10) {
      $("#header").addClass("on");
    } else {
      $("#header").removeClass("on");
    }
  });

  // 햄버거버튼에 호버했을때 헤더 열림
  $(".hamburger-button").mouseenter(function () {
    $(this).siblings('#header').addClass('on')
  });

  $(".hamburger-button").mouseleave(function () {
    $(this).siblings('#header').removeClass('on')
  });

  // 햄버거버튼 열기 닫기
  $(".hamburger-button").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(".m_menu").toggleClass("visible");
  });
});


$(window).on('load', function(){

  //새로고침시 맨 위로
  setTimeout (function () {
    scrollTo(0,0);
    },100);
});
   
   const scale = 117.5309;
    let value = scale;
    let prevValue = value;
    let activeSlide;
    let isFirst = true;
  

    //  article2 가로 스크롤 부분 
    const carousel = new Swiper(".swiper", {
      mousewheel: {
        eventsTarget: ".mousewheel-wrap",
      },
      speed: 500,
      allowTouchMove: false,
      centeredSlides: true,
      slidesPerView: "auto",
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0,
        depth: $(window).width() / 2,
        slideShadows: false,
        scale: 0.8,
      },
      on: {
        afterInit: (swiper) => {
          activeSlide = swiper;
        },
        enable: (swiper) => {
          if (swiper.isBeginning) {
            if (isFirst) {
              isFirst = false;
              swiper.allowSlideNext = false;
            }
          }
        },
        // after slide change
        slideChangeTransitionEnd: (swiper) => {
          if (swiper.isBeginning) {
            isFirst = true;
          }
        },
        // before slide change
        beforeTransitionStart: (swiper) => {
          activeSlide = swiper;
          if (swiper.visibleSlides.hasClass("last")) {
            swiper.allowSlideNext = false;
            isFirst = true;
          } else {
            swiper.allowSlideNext = true;
          }
  
          if (swiper.isBeginning) {
            isFirst = true;
            $(".section2").scrollTop($(".section2").scrollTop() - 10);
          }
        },

        scroll: (swiper, event) => {
          if (event.wheelDelta / 120 < 0) {
            // 첫 번째 슬라이드
            if (swiper.isBeginning) {
              // 예측 스크롤 방지
              if (!isFirst) {
                // 다음 슬라이드 이동 허용
                swiper.allowSlideNext = true;
                // fullpage 비활성
                fullpage_api.setAllowScrolling(false);
  
                // swiper 활성
                carousel.enable();
              }
            }
            // 마지막 슬라이드
            if (activeSlide.visibleSlides.hasClass("last")) {
              // 예측 스크롤 방지
              if (isFirst) {
                isFirst = false;
                fullpage_api.setAllowScrolling(false);
              } else {
                // 다음 섹션으로 이동
                fullpage_api.moveTo(3);
                //   fullpage_api.moveSectionDown();
              }
            }
          } else {
            // 첫 번째 슬라이드
            if (swiper.isBeginning) {
              setTimeout(() => {
                // 섹션 스크롤 활성
                fullpage_api.setAllowScrolling(true);
                carousel.disable();
              }, 500);
            }
          }
        },
      },
    });

     
// article7 이미지 클릭하면 모달창에서 크게 보기

$('.article7 .movie img').on('click', function(){
  console.log('click')
  let src = $(this).attr('data-src')
  let modal = '<div class="modal">'
  modal += `<div class="imgbox">`
  modal += `<iframe src="${src}" width="100%" height="100%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  modal += `<button type="button"><i class="fa-solid fa-x"></i></button>`
  modal += `</div>`
  modal += `</div>`

  $('body').append(modal)

  $('.modal').css({
      zIndex:'9999999',
      position:'fixed',
      top:0,
      left:0,
      display:"block",
      width:'100%',
      height:'100%',
      paddingTop:'56.25%',
      background:'rgba(0,0,0,0.7)',
  })

 
   $('.modal .imgbox').css({
      position:'absolute',
      width:'50vw',
      height:'30vw',
      top:'50%',
      left:'50%',
      transform:'translate(-50%, -60%)'
   })

   if (window.innerWidth < 1024){
      $('.modal .imgbox').css({
          position:'absolute',
          width:'90%',
          height:'30%',
          top:'50%',
          left:'50%',
          transform:'translate(-50%, -60%)'
       })
   } 

  $('.imgbox button').css({
      
      position:'absolute',
      top:'0',
      right:'0',
      background:'#000',
      color:'#fff',
      padding:'4px 4px',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer'
  })

})

// 모달창의 닫기 버튼 클릭하면 모달창 닫게 하기
$('body').on('click', '.modal button, .modal', function(){
  $('.modal').remove()
})

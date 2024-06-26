$(function () {


    // 스와이퍼 시작!
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',            /* 슬라이드 방향 : 'vertical' , 'horizontal' */
        loop: true,                         // 반복여부
        autoplay: {                         // 자동재생
            delay: 2000,                    // 슬라이드 당 지연시간 (ms)
            pauseOnMouseEnter: true,        // 마우스 올리면, 자동재생 멈춤
            disableOnInteraction: true,     // 인터렉션(화살표,드래그,...) 중 자동재생 비활성화        
        },
        speed: 900,                        // 슬라이드가 넘어가는 시간 (ms)
        slidesPerView: 1,                   // 보여지는 슬라이드 개수
        spaceBetween: 0,                    // 슬라이드 간 여백

        grabCursor: false,                   // 마우스커서를 잡는 손가락 모양
        centeredSlides: false,              // 센터모드

        allowTouchMove: false,               // 마우스 커서로 슬라이드 넘기기 비활성화

        // If we need pagination

        // Navigation arrows
        navigation: {
            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev',
        },


        // And if we need scrollbar
        // scrollbar: {
        //     el: '.swiper-scrollbar',    // 스크롤바가 적용될 요소
        //     hide: true,                 // 스크롤바 숨김(직접 움직일 때는 보이고, 그외에 숨김)
        //     draggable: true,            // 스크롤바 드래그 가능 여부
        //     snapOnRelease: true,        // 스크롤바 놓을 때, 슬라이드 위치 맞춤
        // },

        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 2
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 2
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 3
                
            },
        },
    });


})
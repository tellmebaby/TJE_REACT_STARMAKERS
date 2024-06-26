// document.addEventListener('DOMContentLoaded', function () {
//     const token = document.querySelector("meta[name='_csrf']").getAttribute("content");
//     const header = document.querySelector("meta[name='_csrf_header']").getAttribute("content");
//     const carouselInner = document.getElementById('carousel-inner');
//     const user = document.querySelector("meta[name='user']").getAttribute("content");

//     function createCard(cardData) {
//         const content = cardData.content;
//         const categories = cardData.category1.split(',');
//         const icon1 = categories.includes('afreeca') ? '<img src="/img/icon/afreeca.png" alt="아이콘1" class="content-icon">' : '';
//         const icon2 = categories.includes('chzzk') ? '<img src="/img/icon/chzzk.png" alt="아이콘2" class="content-icon">' : '';
//         const icon3 = categories.includes('youtube') ? '<img src="/img/icon/youtube.png" alt="아이콘3" class="content-icon">' : '';
//         const icon4 = categories.includes('instagram') ? '<img src="/img/icon/instagram.png" alt="아이콘4" class="content-icon">' : '';

//         const categories2 = cardData.category2.split(',');
//         const musicBtn = categories2.includes('music') ? '<a href="/page/starCard/starList?option=music" class="btn btn-custom">#음악</a>' : '';
//         const travelBtn = categories2.includes('travel') ? '<a href="/page/starCard/starList?option=travel" class="btn btn-custom">#여행</a>' : '';
//         const foodBtn = categories2.includes('food') ? '<a href="/page/starCard/starList?option=food" class="btn btn-custom">#음식</a>' : '';
//         const gameBtn = categories2.includes('game') ? '<a href="/page/starCard/starList?option=game" class="btn btn-custom">#게임</a>' : '';
//         const animalBtn = categories2.includes('animal') ? '<a href="/page/starCard/starList?option=animal" class="btn btn-custom">#동물</a>' : '';
//         const exerciseBtn = categories2.includes('workOut') ? '<a href="/page/starCard/starList?option=workout" class="btn btn-custom">#운동</a>' : '';
//         const fashionBtn = categories2.includes('fashion') ? '<a href="/page/starCard/starList?option=fashion" class="btn btn-custom">#패션</a>' : '';
//         const asmrBtn = categories2.includes('asmr') ? '<a href="/page/starCard/starList?option=asmr" id="asmr-link" class="btn btn-custom">#ASMR</a>' : '';

//         let starLinksHtml = ''; // 좋아요 버튼이 담길 변수
//         let likeVar = ''; // 좋아요 수를 담을 변수
//         let starNo = cardData.starNo;

//         // 좋아요 수 처리
//         if (cardData.likes < 100) {
//             likeVar = cardData.likes;
//         } else {
//             likeVar = (cardData.likes * 0.001).toFixed(1) + ' k';
//         }

//         let viewVar = ''; // 조회수 처리
//         if (cardData.views < 100) {
//             viewVar = cardData.views;
//         } else {
//             viewVar = (cardData.views * 0.001).toFixed(1) + ' k';
//         }

//         if (user !== '') {
//             let starIconType = '';
//             if (cardData.action === 'liked') {
//                 starIconType = `<i id="changeStar" class="fa-solid fa-star"></i>`;
//             } else {
//                 starIconType = `<i id="changeStar" class="fa-regular fa-star"></i>`;
//             }

//             starLinksHtml = `
//                 <div class="star-links liked" data-no="${cardData.starNo}">
//                     ${starIconType}
//                     <span class="count">${likeVar} like</span>
//                 </div>`;
//         } else {
//             starLinksHtml = `
//                 <div class="star-links liked" data-no="${cardData.starNo}">
//                     <span class="count">${viewVar} view</span>
//                 </div>`;
//         }

//         return `
//         <div class="col-md-2 mb-4">
//             <div class="card standard" ondblclick="animateCard(this, ${cardData.starNo})" data-no="${cardData.starNo}">
//                 <div class="card custom-card" style="background-image: url('/file/img/${cardData.imgNo}');">
//                     <span class="star">&#9733;</span> 
//                     <div class="top-container">
//                         <div class="left-content">
//                             ${icon1}
//                             ${icon2}
//                             ${icon3}
//                             ${icon4}
//                         </div>
//                         <div class="right-content" data-no="${cardData.starNo}">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
//                             <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
//                             </svg>
//                         </div>
//                     </div>
//                     <div class="overlay" style="background-image: url('/file/img/${cardData.imgNo}');"></div>
//                     <div class="card-body" data-no="${cardData.starNo}">
//                         <h5 class="card-title">
//                             <img src="/file/img/${cardData.userImgId}" alt="작성자 아이콘" class="author-icon">
//                             ${cardData.title}
//                         </h5>
//                         <div class="card-text">${cardData.content}</div>
//                         <div class="bottom-container">
//                             <div class="field-links">
//                                 ${musicBtn}
//                                 ${travelBtn}
//                                 ${foodBtn}
//                                 ${gameBtn}
//                                 ${animalBtn}
//                                 ${exerciseBtn}
//                                 ${fashionBtn}
//                                 ${asmrBtn}
//                             </div>
//                                 ${starLinksHtml}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         `;
//     }

//     function createCarouselItem(cardsChunk, isActive = false) {
//         const activeClass = isActive ? 'active' : '';
//         return `
//             <div class="carousel-item ${activeClass}">
//                 <div class="row mx-0">
//                     ${cardsChunk.map(createCard).join('')}
//                 </div>
//             </div>
//         `;
//     }

//     function chunkArray(array, chunkSize) {
//         const chunks = [];
//         for (let i = 0; i < array.length; i += chunkSize) {
//             chunks.push(array.slice(i, i + chunkSize));
//         }
//         return chunks;
//     }

//     function loadMainList() {
//         $.ajax({
//             url: "/page/mainlist",
//             type: "GET",
//             dataType: "json",
//             success: function (response) {
//                 const cards = response;
//                 const cardChunks = chunkArray(cards, 6);
//                 cardChunks.forEach((chunk, index) => {
//                     const carouselItem = createCarouselItem(chunk, index === 0);
//                     carouselInner.append(carouselItem);
//                 });

//                 $('.card-text p span').css({
//                     'background-color': '',
//                     'color': '',
//                     'font-size': '',
//                 });

//                 $('.card-body').on('click', function (e) {
//                     var no = $(this).data('no');
//                     if (no != null) {
//                         window.location = "/page/starCard/starRead?starNo=" + no;
//                     }
//                 });
//             },
//             error: function (xhr, status, error) {
//                 console.error("Error:", error);
//             }
//         });
//     }

    // function loadStarMembers() {
    //     $.ajax({
    //         url: "/page/starMember",
    //         method: "GET",
    //         dataType: "json",
    //         success: function (data) {
    //            // 가져온 데이터를 처리하여 HTML로 동적으로 생성하여 삽입
    //            $.each(data, function(index, member) {
    //             const categories2 = member.category2.split(',');
    //             const musicBtn = categories2.includes('music') ? '<a href="/page/starCard/starList?option=music" class="btn btn-custom">#음악</a>' : '';
    //             const travelBtn = categories2.includes('travel') ? '<a href="/page/starCard/starList?option=travel" class="btn btn-custom">#여행</a>' : '';
    //             const foodBtn = categories2.includes('food') ? '<a href="/page/starCard/starList?option=food" class="btn btn-custom">#음식</a>' : '';
    //             const gameBtn = categories2.includes('game') ? '<a href="/page/starCard/starList?option=game" class="btn btn-custom">#게임</a>' : '';
    //             const animalBtn = categories2.includes('animal') ? '<a href="/page/starCard/starList?option=animal" class="btn btn-custom">#동물</a>' : '';
    //             const exerciseBtn = categories2.includes('workOut') ? '<a href="/page/starCard/starList?option=workout" class="btn btn-custom">#운동</a>' : '';
    //             const fashionBtn = categories2.includes('fashion') ? '<a href="/page/starCard/starList?option=fashion" class="btn btn-custom">#패션</a>' : '';
    //             const asmrBtn = categories2.includes('asmr') ? '<a href="/page/starCard/starList?option=asmr" id="asmr-link" class="btn btn-custom">#ASMR</a>' : '';

    //             var memberHTML = '<div class="starmember" data-no="' + member.starNo + '">';
    //             memberHTML += '<img class="starmember-img" src="/file/img/' + member.userImgId + '" alt="스타 멤버 ' + (index + 1) + '">';
    //             memberHTML += '<span>' + member.writer + '</span>';
    //             memberHTML += musicBtn;
    //             memberHTML += travelBtn;
    //             memberHTML += foodBtn;
    //             memberHTML += gameBtn;
    //             memberHTML += animalBtn;
    //             memberHTML += exerciseBtn;
    //             memberHTML += fashionBtn;
    //             memberHTML += asmrBtn;
    //             memberHTML += '</div>';
    //             $('#newStarMember').append(memberHTML);
    //         });

    //         // 모든 .starmember 요소에 클릭 이벤트 리스너 추가
    //         document.querySelectorAll('.starmember').forEach(function(element) {
    //             element.addEventListener('click', function() {
    //                 // data-no 속성 값 가져오기
    //                 var starNo = this.getAttribute('data-no');
    //                 console.log('Clicked starNo:', starNo); // 디버깅을 위한 로그 출력
    //                 // 새로운 URL로 이동
    //                 var url = '/page/starCard/starRead?starNo=' + starNo;
    //                 window.location.href = url;
    //             });
    //         });

    //     },
    //     error: function(xhr, status, error) {
    //         console.error('Error fetching star members:', error);
    //     }
    //     });
    // }

    // let memberUrl = '/page/starMember';

    // function loadMembers(loadurl) {
    //     $.ajax({
    //         url: loadurl,
    //         method: "GET",
    //         dataType: "json",
    //         success: function (data) {
    //                // 가져온 데이터를 처리하여 HTML로 동적으로 생성하여 삽입
    //                $.each(data, function(index, member) {
    //                 const categories2 = member.category2.split(',');
    //                 const musicBtn = categories2.includes('music') ? '<a href="/page/starCard/starList?option=music" class="btn btn-custom">#음악</a>' : '';
    //                 const travelBtn = categories2.includes('travel') ? '<a href="/page/starCard/starList?option=travel" class="btn btn-custom">#여행</a>' : '';
    //                 const foodBtn = categories2.includes('food') ? '<a href="/page/starCard/starList?option=food" class="btn btn-custom">#음식</a>' : '';
    //                 const gameBtn = categories2.includes('game') ? '<a href="/page/starCard/starList?option=game" class="btn btn-custom">#게임</a>' : '';
    //                 const animalBtn = categories2.includes('animal') ? '<a href="/page/starCard/starList?option=animal" class="btn btn-custom">#동물</a>' : '';
    //                 const exerciseBtn = categories2.includes('workOut') ? '<a href="/page/starCard/starList?option=workout" class="btn btn-custom">#운동</a>' : '';
    //                 const fashionBtn = categories2.includes('fashion') ? '<a href="/page/starCard/starList?option=fashion" class="btn btn-custom">#패션</a>' : '';
    //                 const asmrBtn = categories2.includes('asmr') ? '<a href="/page/starCard/starList?option=asmr" id="asmr-link" class="btn btn-custom">#ASMR</a>' : '';

    //                 var memberHTML = '<div class="starmember" data-no="' + member.starNo + '">';
    //                 memberHTML += '<img class="starmember-img" src="/file/img/' + member.userImgId + '" alt="스타 멤버 ' + (index + 1) + '">';
    //                 memberHTML += '<span>' + member.writer + '</span>';
    //                 memberHTML += musicBtn;
    //                 memberHTML += travelBtn;
    //                 memberHTML += foodBtn;
    //                 memberHTML += gameBtn;
    //                 memberHTML += animalBtn;
    //                 memberHTML += exerciseBtn;
    //                 memberHTML += fashionBtn;
    //                 memberHTML += asmrBtn;
    //                 memberHTML += '</div>';
    //                 $('#newStarMember').append(memberHTML);
    //             });

    //             // 모든 .starmember 요소에 클릭 이벤트 리스너 추가
    //             document.querySelectorAll('.starmember').forEach(function(element) {
    //                 element.addEventListener('click', function() {
    //                     // data-no 속성 값 가져오기
    //                     var starNo = this.getAttribute('data-no');
    //                     console.log('Clicked starNo:', starNo); // 디버깅을 위한 로그 출력
    //                     // 새로운 URL로 이동
    //                     var url = '/page/starCard/starRead?starNo=' + starNo;
    //                     window.location.href = url;
    //                 });
    //             });

    //         },
    //         error: function(xhr, status, error) {
    //             console.error('Error fetching star members:', error);
    //         }
    //     });
    // }


//     loadMainList();
// });

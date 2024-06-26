<div class="list">
                        <div id="promotionCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                            <div class="carousel-inner" id="carousel-inner">
                                <!-- Dynamically added carousel items will go here -->
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

```
<!-- 페이지네이션 -->
<center>
<div>
    <!-- [ 처음으로 ]-->
    <a th:href="|/page/mypage/payment?=${page.first}&code=${option.code}&keyword=${option.keyword}|">&laquo;</a>

    <!-- [ 이전 ] -->
    <th:block th:if="${page.page != page.first}">
        <a th:href="|/page/mypage/payment?page=${page.prev}&code=${option.code}&keyword=${option.keyword}|">&lt;</a>
    </th:block>

    <th:block th:each="no : ${#numbers.sequence(page.start, page.end)}">  <!--(1,10)모델에 담은 페이지가 아니라 그냥 1부터 10 --> 
        <!-- 현재 페이지 -->
        <!--
        #numbers.sequence(시작번호, 끝번호)
        : 시작번호부터 끝번호까지 번호 리스트를 생성
        -->
        <th:block th:if="${page.page == no}">
            <b>
                <span th:text="${no}"></span>
            </b>
        </th:block>
        <th:block th:if="${page.page != no}">
            <a th:href="|/page/mypage/payment?page=${no}&code=${option.code}&keyword=${option.keyword}|" th:text="${no}"></a>
        </th:block>
    </th:block>

    <!-- [ 다음 ] -->
    <th:block th:if="${page.page != page.last}">
        <a th:href="|/page/mypage/payment?page=${page.next}&code=${option.code}&keyword=${option.keyword}|">&gt;</a>
    </th:block>

    <!-- [ 마지막 ]-->
    <a th:href="|/page/mypage/payment?page=${page.last}&code=${option.code}&keyword=${option.keyword}|">&raquo;</a>
</div>
</center>
```
const token = $("meta[name='_csrf']").attr("content");
const header = $("meta[name='_csrf_header']").attr("content");

//채팅리스트가져오기
function MessagesList() {
  $.ajax({
    type: "POST",
    url: "/message/MessagesList",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    success: function (response) {
      displayMessages(response);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching messages:", status, error);
      console.log(xhr.responseText);
    },
  });
}

// 메시지를 표시하는 함수
function displayMessages(messages) {
  // 메시지가 표시될 리스트 엘리먼트를 가져옴
  var list = $(".contacts-list");
  // 기존에 표시된 메시지를 모두 제거
  list.empty();

  var total_count = 0;
  // 각 메시지를 반복하여 리스트에 추가
  messages.forEach(function (message) {
    var koreanTime = convertToKoreanTime(message.regDate);
    total_count += message.count;

    var countHTML =
      message.count !== 0 ? `<span class="count">${message.count}</span>` : "";

    var messageHTML = `
            <li onclick="userChatList(${message.userNo})">
                <img class="contacts-list-img" src="/file/img/${
                  message.imgNo
                }" alt="User Avatar" style="width: 45px; height: 45px; object-fit: cover; margin-right: 10px;">
                <div class="contacts-list-info">
                    <span class="contacts-list-name">${message.name}</span>
                    <span class="contacts-list-msg">${truncateMessage(
                      message.content
                    )}</span>
                </div>
                <div class="additional-info">
                    ${countHTML}
                    <span class="reg-date" data-time="${koreanTime}">${koreanTime}</span>
                </div>
            </li>`;

    // 리스트에 메시지 추가
    list.append(messageHTML);
  });

  $("#total-count").html(total_count);
}

// 날짜를 한국 시간으로 변환하는 함수
function convertToKoreanTime(utcTime) {
  // UTC 시간을 JavaScript Date 객체로 변환
  var date = new Date(utcTime);

  // 시간 형식에 맞게 변환하여 반환
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시를 12시로 변경
  minutes = minutes < 10 ? "0" + minutes : minutes; // 분을 2자리로 표시
  var koreanTime = ampm + " " + hours + ":" + minutes;
  return koreanTime;
}

function truncateMessage(message) {
  const maxLength = 37; // 최대 길이 지정
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + "..."; // 일정 길이까지 자르고 ... 추가
  } else {
    return message; // 최대 길이보다 작으면 그대로 반환
  }
}

//   채팅내용가져오기
function userChatList(no) {
  document
    .querySelector(".direct-chat")
    .classList.remove("direct-chat-contacts-open");
  $("#userNo").val(no);
  currentUserNo = no; // 현재 사용자의 번호를 저장

  $.ajax({
    type: "POST",
    url: "/message/getMessagesByUser",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: "no=" + no,
    success: function (response) {
      renderMessages(response);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching messages:", status, error);
      console.log(xhr.responseText);
    },
  });
}

// 채팅내용 표기
function renderMessages(messages) {
  const chatMessages = $("#chatMessages");
  chatMessages.empty();

  messages.forEach(function (message) {
    const messageElement = $('<div class="direct-chat-msg"></div>');
    const messageContent = $('<div class="direct-chat-text"></div>').text(
      message.content
    );
    const messageInfo = $('<div class="direct-chat-infos clearfix"></div>');
    const messageTimestamp = $(
      '<span class="direct-chat-timestamp float-right"></span>'
    ).text(message.timestamp);

    if (message.code === "toUser") {
      messageElement.addClass("right");
      messageInfo.append(
        $('<span class="direct-chat-name float-right"></span>').text("관리자")
      );
      messageElement.append(
        $(
          '<img class="direct-chat-img" src="https://i.namu.wiki/i/bCmE_8XrnEYeEKlbme2ZS8rsG6dcB1vGD-UJtxvGncvXuYL9fiBqL8Fk_6cQ58EKJYTyyw9mA0LWK3yIaRYQow.webp" alt="message user image">'
        )
      );
    } else if (message.code === "toAdmin") {
      messageElement.addClass("left");
      messageInfo.append(
        $('<span class="direct-chat-name float-left"></span>').text(
          message.name
        )
      );
      messageElement.append(
        $(
          '<img class="direct-chat-img" src="/file/img/' +
            message.imgNo +
            '" alt="message user image">'
        )
      );
    }

    messageInfo.append(messageTimestamp);
    messageElement.append(messageInfo);
    messageElement.append(messageContent);

    chatMessages.append(messageElement);
  });

  chatMessages.scrollTop(chatMessages[0].scrollHeight);
}

$(document).ready(function () {
  MessagesList();

  // 3초마다 함수 실행
  setInterval(function () {
    if ($(".direct-chat").hasClass("direct-chat-contacts-open")) {
      MessagesList();
    } else if (currentUserNo !== null) {
      userChatList(currentUserNo);
    }
  }, 3000);

  $("#messageForm").submit(function (event) {
    event.preventDefault();

    if (!$("#chatInput").val()) {
      return;
    }

    var userNO = $("#userNo").val();

    var formData = {
      content: $("#chatInput").val(),
      code: $('input[name="code"]').val(),
      userNo: userNO,
      name: "관리자",
    };

    $.ajax({
      type: "POST",
      url: "/message/insertToAdmin",
      contentType: "application/json",
      data: JSON.stringify(formData),
      beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token);
      },
      success: function (response) {
        $("input[name=content]").val("");
        userChatList(userNO);
      },
      error: function (xhr, status, error) {
        console.error("Error sending message:", status, error);
        console.log(xhr.responseText);
      },
    });
  });
});

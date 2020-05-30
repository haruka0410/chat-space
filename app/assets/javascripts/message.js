$(function(){
     function buildHTML(message) {
      if ( message.image ) {
        var html =
         `<div class="main-chat__message-list__message" data-message-id=${message.id}>
            <div class="main-chat__message-list__message__upper-info">
              <div class="main-chat__message-list__message__upper-info__left-info">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__message__upper-info__right-info">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="main-chat__message-list__message__text">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="main-chat__message-list__message" data-message-id=${message.id}>
            <div class="main-chat__message-list__message__upper-info">
              <div class="main-chat__message-list__message__upper-info__left-info">
                ${message.user_name}
              </div>
              <div class="main-chat__message-list__message__upper-info__right-info">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="main-chat__message-list__message__text">
                ${message.content}
              </p>
            </div>
          </div>`
         return html;
        };
     }
  $('.new-message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html)
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.main-chat__message-list').animate({scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }   
});
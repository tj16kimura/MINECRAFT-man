function doPost(e) {
  // Messaging APIのリファレンスは以下
  // https://developers.line.biz/ja/reference/messaging-api/
  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken= event.replyToken;
  
  // replyContentsにメッセージをpushしていく（1度に送れるメッセージは最大5件まで）
  var replyContents = [];
  // デフォルトのメッセージタイプはtext
  var replyType = 'text';

  if (typeof replyToken === 'undefined') {
    return; // エラー処理
  }
  
  // グループIDとユーザーIDを取得
  var userId = event.source.userId;
  var groupId = event.source.groupId;

  if(event.type == 'follow') { 
    // ユーザーにbotがフォローされた場合に起きる処理
  }
  
  if(event.type == 'message') {
    var userMessage = event.message.text;
    var replyMessage;
    
    // メッセージの分岐処理はここに
    if (userMessage == '中心'){
      replyContents.push(return_position());
    } else if (userMessage[0] == '/') {
      replyContents.push(check_lighting_range(userMessage));
    } else if(userMessage == 'な？') {
      var user = getUserProfile(userId, groupId);
      replyMessage = user.displayName + 'に賛成!';
      replyContents.push(makeMes('text', replyMessage));
      replyContents.push(makeMes('image', user.pictureUrl));
    } else if(userMessage == 'サバ') {
      replyContents.push(serverAlival());
    }
    sendMes(replyToken, replyContents);
  }
}

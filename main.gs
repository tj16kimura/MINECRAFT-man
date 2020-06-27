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
    return;
  }
  
  if(event.type == 'message') {
    var userMessage = event.message.text;
    var replyMessage;
    
    // メッセージの分岐処理はここに
    if (userMessage == '中心'){
      replyContents.push(return_position());

    } else if (userMessage[0] == '/' && (isFinite(userMessage[1]) || (userMessage[1] == '-' && isFinite(userMessage[2])))) {
      replyContents.push(check_lighting_range(userMessage));

    } else if(userMessage == 'な？') {
      var user = getUserProfile(userId, groupId);
      replyMessage = user.displayName + 'に賛成!';
      replyContents.push(makeMes('text', replyMessage));
      // replyContents.push(makeMes('image', user.pictureUrl));
      // 40 stickers / package
      var random = Math.floor(Math.random()*40);
      replyContents.push(makeMes('sticker', random));

    } else if(['さば', 'サバ', '鯖', 'saba', 'sava'].some(el => userMessage.includes(el))){
      var random = Math.ceil(Math.random()*10);
      if(random === 1){
        replyContents.push(makeMes('text', 'の味噌煮'));
      }else{
        replyContents.push(serverAlival());
      }

    } else {
      replyMessage = funcController(userMessage);
      if (replyMessage.length !== 0) {
        replyContents.push(makeMes('text', replyMessage));
      }
    }
    
    // replyContentsが空の時は何もしない
    if(replyContents.length === 0){
      // とりあえずこれでエラーにはならなさそう
      return 0;
    }else{
      sendMes(replyToken, replyContents);
      return;
    }
  }
}

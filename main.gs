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
    
    if (userMessage == '中心'){
//      replyMessage = '要塞トラップ中心座標\nx:278 y:32 z:593';
//      replyMessage = '要塞トラップ中心座標\nx:' + POS_N_FORTRES[0] + ' y:' + POS_N_FORTRES[1] + ' z:' + POS_N_FORTRES[2];
//      replyContents.push(makeMes('text', replyMessage));
      replyContents.push(return_position());
    } else if (userMessage[0] == '/') {
//      var xyz = userMessage.slice(1).split('.');
//      
//      var x = parseInt(xyz[0]);
//      var y = parseInt(xyz[1]);
//      var z = parseInt(xyz[2]);
//      
//      var dx = x - 278;
//      var dz = z - 593;
//      
//      var angle = Math.atan(dz, dx) * 180 / Math.PI;
//      
//      var dis = (x-278)*(x-278) + (y-32)*(y-32) + (z-593)*(z-593)
//      
//      if(dis < 128*128){
//        replyMessage = '湧き潰しｾｲｯ\n';
//      }else{
//        replyMessage = '安心しな，もう外やで(*^^*)\n';
//      }
//      dis = Math.sqrt(dis);
//      replyMessage = replyMessage + '\n中心までの距離: ' + String(parseInt(dis));
//      replyContents.push(makeMes('text', replyMessage));
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

//function sendMes(token, message){
//  //　実際にメッセージを送信するための処理
//  var url = 'https://api.line.me/v2/bot/message/reply';
//  
//  UrlFetchApp.fetch(url, {
//    'headers': {
//      'Content-Type': 'application/json; charset=UTF-8',
//      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
//    },
//    'method': 'post',
//    'payload': JSON.stringify({
//      'replyToken': token,
//      'messages': message,
//    }),
//  });
//  return ContentService.createTextOutput(
//    JSON.stringify({'content': 'post ok'})
//  ).setMimeType(ContentService.MimeType.JSON);
//}

//function makeMes(type, content){
//  // apiに投げれるようなメッセージオブジェクトを作成する
//  var ret;
//  // テキストメッセージ
//  if(type == 'text'){
//    ret = {
//      'type': 'text',
//      'text': content,
//    };
//  //画像メッセージ(from URL)
//  }else if(type == 'image'){
//    ret = {
//      'type': 'image',
//      'originalContentUrl': content,
//      'previewImageUrl': content,
//    }
//  }
//  return ret
//}

//function serverAlival(){
//  // サーバーの状況を確認し，オンラインのユーザーを知らせる
//  // nice API. thx.
//  var url = 'https://api.minetools.eu/ping/' + SERVER_IP + '/25565';
//  var data = UrlFetchApp.fetch(url, {
//    'method': 'get',
//  });
//  data = JSON.parse(data);
//  var mes;
//  //Logger.log(data.error);
//  if(data.error == 'timed out'){
//    mes = 'Server is Dead <3';
//  }else{
//    var num = data.players.online;
//    mes = '現在オンライン：' + num + '名';
//  }
//  if(num > 0){
//    for(var i=0;i<num;i++){
//      mes += '\n' + data.players.sample[i].name;
//    }
//  }
//  return makeMes('text', mes);
//}

function getUserProfile(userId, groupId){ 
  // profileを取得してくる関数
  if(typeof groupId === 'undefined'){
    var url = 'https://api.line.me/v2/bot/profile/' + userId;    
  }else{
    var url = 'https://api.line.me/v2/bot/group/' + groupId + '/member/' + userId;
  }
  var userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
  })
  // 得られる属性は次の3つ． -> displayName, pictureUrl, statusMessage
  return JSON.parse(userProfile);
}
// Message関連の関数を定義

function sendMes(token, message){
  //　実際にメッセージを送信するための処理
  var url = 'https://api.line.me/v2/bot/message/reply';
  
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': token,
      'messages': message,
    }),
  });
  return ContentService.createTextOutput(
    JSON.stringify({'content': 'post ok'})
  ).setMimeType(ContentService.MimeType.JSON);
}

function makeMes(type, content){
  // apiに投げれるようなメッセージオブジェクトを作成する
  var ret = null;
  // テキストメッセージ
  if(type == 'text'){
    ret = {
      'type': 'text',
      'text': content,
    };
  //画像メッセージ(from URL)
  }else if(type == 'image'){
    ret = {
      'type': 'image',
      'originalContentUrl': content,
      'previewImageUrl': content,
    }
  }else if(type == 'sticker'){
    ret = {
      'type': 'sticker',
      // packageは固定する
      'packageId': '11537',
      // 40 stickers / package
      'stickerId': content + 52002734
    }
  }
  return ret
}

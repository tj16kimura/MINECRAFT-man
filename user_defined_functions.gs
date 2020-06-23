// 自作関数を定義

function return_position() {
  var replyMessage = '要塞トラップ中心座標\nx:' + POS_N_FORTRES[0] + ' y:' + POS_N_FORTRES[1] + ' z:' + POS_N_FORTRES[2];
  return makeMes('text', replyMessage);
}

function check_lighting_range(userMessage) {
  // 湧きつぶし範囲判定
  // input:  userMessage
  // output: makeRes(replyMessage)
  var xyz = userMessage.slice(1).split('.');
  var x = parseInt(xyz[0]);
  var y = parseInt(xyz[1]);
  var z = parseInt(xyz[2]);
  
  var dx = x - POS_N_FORTRES[0];
  var dy = y - POS_N_FORTRES[1];
  var dz = z - POS_N_FORTRES[2];
  var radius = 128;
  var replyMessage;
  
  var angle = Math.atan(dz, dx) * 180 / Math.PI;
  var dis = dx*dx + dy*dy + dz*dz;
  
  if(dis < radius*radius){
    replyMessage = '湧き潰しｾｲｯ\n';
  } else {
    replyMessage = '安心しな，もう外やで(*^^*)\n';
  }
  dis = Math.sqrt(dis);
  replyMessage = replyMessage + '\n中心までの距離: ' + String(parseInt(dis));
  return makeRes('text', replyMessage);
}

function serverAlival(){
  // サーバーの状況を確認し，オンラインのユーザーを知らせる
  // nice API. thx.
  var url = 'https://api.minetools.eu/ping/' + SERVER_IP + '/25565';
  var data = UrlFetchApp.fetch(url, {
    'method': 'get',
  });
  data = JSON.parse(data);
  var mes;
  //Logger.log(data.error);
  if(data.error == 'timed out'){
    mes = 'Server is Dead <3';
  }else{
    var num = data.players.online;
    mes = '現在オンライン：' + num + '名';
  }
  if(num > 0){
    for(var i=0;i<num;i++){
      mes += '\n' + data.players.sample[i].name;
    }
  }
  return makeMes('text', mes);
}

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

function funcController(userMessage) {
  /* userMessageから処理を振り分ける関数 */
  var replyMessage = [];
  var replyType = [];
  // userMessageの先頭が「/」 かつ userMessageの長さが5以上
  if (userMessage[0] == '/' && userMessage.length >= 5) {
    // command(/***:)とmessage(NAME***)に分離
    var command = userMessage.slice(0, 5);
    var message = userMessage.slice(5);
    // 構文チェック(/***:)
    if (command[4] == ':') {
      var cmd = command.slice(1, 4);
      switch(cmd) {
        case 'lst' :
          replyType = 'text';
          replyMessage = showList(message);
          break;
        case 'pos' :
          replyType = 'text';
          replyMessage = returnPos(message);
          break;
        case 'reg' :
          replyType = 'text';
          replyMessage = registPos(message);
          break;
        case 'upd':
          replyType = 'text';
          replyMessage = updatePos(message);
          break;
        case 'del':
          replyType = 'text';
          replyMessage = deletePos(message);
          break;
        case 'map':
          replyType = 'image';
          replyMessage = genMap();
        default :
          break;
      }
    }
  }
  
  return {replyType: replyType, replyMessage: replyMessage};
}

function test() {
  funcController('/-.20.30');
}

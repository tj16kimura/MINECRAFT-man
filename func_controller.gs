function funcController(userMessage) {
  /* userMessageから処理を振り分ける関数 */
  var replyMessage = [];
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
          replyMessage = showList(message);
          break;
        case 'pos' :
          replyMessage = returnPos(message);
          break;
        case 'reg' :
          replyMessage = registPos(message);
          break;
        case 'upd':
          replyMessage = updatePos(message);
          break;
        case 'del':
          replyMessage = deletePos(message);
          break;
        default :
          break;
      }
    }
  }
  
  return replyMessage;
}

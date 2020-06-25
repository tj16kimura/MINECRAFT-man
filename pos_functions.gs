// /POSに関する関数を定義

function show_list() {
  /* 登録済みの施設の名前を返す関数 */
  var message = '[ERROR]';
  // Sheet情報を取得
  var sheet_info = get_sheet_info(SPREADSHEET_ID, 'POS');
  // Sheet
  var sheet = sheet_info[0];
  // 行数
  var num_row = sheet_info[1];
  
  // List取得 (2次元配列)
  // pos_list[i][0]
  var pos_list = sheet.getRange(2, 1, num_row, 1).getValues();
  
  // Messageを生成
  message = '-- LIST --';
  for (var i=0; i<num_row; i++) {
    message += '\n' + pos_list[i][0];
  }
  
  return message;
}

function ret_pos(name) {
  /* 指定された施設の座標を返す関数 */
  var message = '[ERROR]';
  // 入力されたnameの整合性チェック
  if (name == null || name == '') {
    message = '## REGISTERED ##\n';
    message += show_list();
    // nullだったらlistを表示
    return message;
  }
  // Sheet情報を取得
  var sheet_info = get_sheet_info(SPREADSHEET_ID, 'POS');
  // Sheet
  var sheet = sheet_info[0];
  // 行数
  var num_row = sheet_info[1];
  
  // nameの登録チェック
  var exist_name = sheet.getRange(2, 1, num_row, 1).createTextFinder(name).matchEntireCell(true).findNext();
  if (exist_name == null) {
    message += ' [REGIST]\n' + name + ' is unregistered';
    return message;
  }
  
  // 登録済みnameのセルの行を取得
  var cell_name = exist_name.getA1Notation().slice(1);
  
  // nameの座標を取得
  // pos_name[0][i]
  var pos_name = sheet.getRange('B'+cell_name+':'+'D'+cell_name).getValues();
  
  // Messageを生成
  message = '-- POS --\n';
  message += name + ' ->\nx:' + pos_name[0][0] + ' y:' + pos_name[0][1] + ' z:' + pos_name[0][2];
  
  return message;
}

function reg_pos(user_input) {
  /* 施設座標を新規に登録する関数 */
  var message = '[ERROR]';
  // user_inputの整合性チェック
  if (user_input == null || user_input == '') {
    message += ' [SYNTAX]\n/reg:NAME.x.y.z';
    return message;
  }
  // 「.」で分割
  // split_input[i]
  var split_input = user_input.split('.');
  if (split_input.length !== 4) {
    message += ' [SYNTAX]\n/reg:NAME.x.y.z';
    return message;
  }
  
  // Sheet情報を取得
  var sheet_info = get_sheet_info(SPREADSHEET_ID, 'POS');
  // Sheet
  var sheet = sheet_info[0];
  // 行数
  var num_row = sheet_info[1];
  
  // nameの登録チェック
  var exist_name = sheet.getRange(2, 1, num_row, 1).createTextFinder(split_input[0]).matchEntireCell(true).findNext();
  if (exist_name !== null) {
    message +=' [REGIST]\n' + split_input[0] + ' is already registered';
    return message;
  }
  
  // 新規登録
  //## TimeStampするならここ ##//
//  split_input.push(timestamp)
  sheet.appendRow(split_input);
  
  // Message生成
  message = 'Registed ' + split_input[0] + ' ->\nx:' + split_input[1] + ' y:' + split_input[2] + ' z:' + split_input[3];
  
  return message;
}

// upd と del を作ろう

function get_sheet_info(SHEET_ID, SHEET_NAME) {
  // Sheet情報を取得
  // SpreadSheetを取得
  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  // POSのシートを取得
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  // 行数を取得 ラベルがあるため -1 -> これはTable上部の位置により変動
  var num_row = sheet.getLastRow() - 1;
  
  return [sheet, num_row];
}

function demo() {
  // Sheet情報を取得
  var sheet_info = get_sheet_info(SPREADSHEET_ID, 'POS');
  // Sheet
  var sheet = sheet_info[0];
  var msg;
//  msg = show_list();
//  msg = ret_pos('Fortress');
  msg = reg_pos('AAA.1.2.3');
  
  sheet.getRange(2, 5).setValue(msg);
}

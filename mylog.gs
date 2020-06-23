function txtLog(data) {
  var doc = DriveApp.getFileById('1KKZS-3fcXS0DRtFJZD8gMOowHsT4xJaL-lRTiEBxNMI');
  var doc_tmp  = DocumentApp.openById('1KKZS-3fcXS0DRtFJZD8gMOowHsT4xJaL-lRTiEBxNMI');
  var data_tmp = doc_tmp.getBody().getText();
  doc.setContent(data_tmp + '\n' + data);
  return;
}

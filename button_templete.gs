function buttonTemplete() {
  var title = 'Sample Title';
  var text  = 'Sample text';
  var post_data = {
    'type'     : 'template',
    'altText'  : 'This is a buttons template',
    'template' : {
      'type'   : 'buttons',
      'title'  : title,
      'text'   : text,
//      'defaultAction': {
//        'type'  : 'postback',
//        'label' : 'Cancel',
//        'data'  : 'action=cancel'
//      },
      'actions': [
        {
          'type'  : 'postback',
          'label' : 'Position',
          'data'  : '/ret:'
        },
        {
          'type'  : 'postback',
          'label' : 'Regist',
          'data'  : '/reg:'
        },
        {
          'type'  : 'postback',
          'label' : 'Update',
          'data'  : '/upd:'
        },
        {
          'type'  : 'postback',
          'label' : 'Delete',
          'data'  : '/del:'
        },
      ]
    }
  }
  return post_data;
}

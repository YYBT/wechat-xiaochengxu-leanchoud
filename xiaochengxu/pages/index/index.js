//index.js
//获取应用实例
const AV = require('../../utils/av-weapp.js');

var app = getApp()
var inputValue
Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    array:[{
      num: '00000',
      password:'000000'
    }]
  },

  bindKeyInput: function(e) {
      inputValue = e.detail.value
    
  },
  
  //事件处理函数
  bindViewTap: function() {

    var self = this;
    var query = new AV.Query('OfoPassword');
    query.equalTo('num', inputValue);
    query.find().then(function (results) {
      console.log(results)
      var arr=[];
      if (results.length <= 0){
        wx.showToast({
          title: '查询不到数据',
          duration: 2000
          })
        }else{
          self.setData({
            textValue: ''
            })
            inputValue = ''
          wx.showToast({
           title: '查询成功',
            icon: 'success',
           duration: 2000
      })
     }

     for (var i = 0; i < results.length; i++) {
       var object = results[i];
        var flag = true;
          for (var j = 0; j < self.data.array.length; j++) {
              var object2 =  self.data.array[j];
              if(object2['num'] == object.get('num')){
                flag = false;
              }
          }
          if (flag){
              arr.push({num: object.get('num'),password: object.get('password')});
          }
          
          }

   self.setData({
      array: arr.concat(self.data.array)
    })
    
    }, function (error) {
       console.log(error)
     });

},

 addViewTap: function() {
   console.log('onLoad')
   wx.navigateTo({
        url: '../add/add'
    })
 },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

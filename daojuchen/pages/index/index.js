//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slides:['../../images/bg_01.png','../../images/bg_02.png','../../images/bg_03.png'],
    current:['0','1','2'],
    currentTab:0,
    scend:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 
  // swiperTab: function(e) {
  //   this.setData({
  //     currentTab:e.data.current,
  //   });
  // },
  changTab: function(e){
    wx.navigateTo({
      url: '../white/white'
    })
  },
  onLoad: function () {
    this.setIntime();
  },
  setIntime: function() {
    var i = 0 ;
    var scend = this.data.scend;
    setInterval(() => {
      i++;
      if(i>2 ){
         i=0;
         scend +=1 
       } 
       if (scend>2) {
         scend = 0
       }
      this.setData({
        currentTab:scend,
      })
     }, 2000)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

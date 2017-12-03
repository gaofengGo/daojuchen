// pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jobs:[
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/drqy-266.jpg',
          title:'达人契约 (3天)',
          small:'50',
        },
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/czqy-266.jpg',
        title:'成长之契约 (3天)',
        small:'75',
        },
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/gjdhq-266.jpg',
        title:'高级装扮兑换卷 (无期限)',
        small:'288',
        },
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/pjtzx.png',
        title:'装备品级调整箱 (15个)',
        small:'15',
        },
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/266-42.png',
        title:'复活币',
        small:'10',
        },
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/266-10000388.png',
        title:'晶之契约 (3天)',
        small:'100',
        },
        { image:'http://ossweb-img.qq.com/images/gameshop/dnf/images/thumb/266-2660671.png',
        title:'闪亮的雷米援助 (15个)',
        small:'50',
        },
     ],
  },
  logbtn: function() {
    wx.showToast({
      title:'兑换中',
      icon:'loading',
      duration:1500,
    }) 
    setTimeout(function(){
      wx.showToast({
      title:'兑换成功',
      icon:'success',
      duration:1000,
    })},1500)  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
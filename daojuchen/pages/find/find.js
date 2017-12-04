// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobs:[],
    windowHeigt:0,
  },
  arrow: function(e){
    wx.navigateTo({
      url: '../white/white'
    })
  },
  cool:function(e) {
    console.log(e);
    let jobs = this.data.jobs
    for(let key in jobs){
      console.log(jobs[key].id);
      if (jobs[key].id === e.currentTarget.dataset.id){
        if (!jobs[key].isSelected){
          jobs[key].isSelected = true;
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 1500,
          })
        }else{
          jobs[key].isSelected = false;
          wx.showToast({
            title: '取消点赞',
            icon: 'success',
            duration: 1500,
          })
        }       
      }
    }
    this.setData({
      jobs : jobs,
    });
 
  },
  // upper:function(){
  //   console.log('下拉加载')
  //   // var that = this;
  //   wx.request({
  //     url:'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc',
  //     complete:(res)=>{
  //       var jobs = this.data.jobs.concat(res.data.data.jobs)
  //       console.log(res)
  //       this.setData({
  //         jobs:jobs,
  //       })
  //     }
  //   })
  // },
  lower:function(){
    console.log('下拉加载');
    // var that = this;
    wx.showToast({
      title:'加载中',
      icon:'loading',
      duration: 1000,
    });
     wx.request({
      url:'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc',
      complete:(res)=>{
        var jobs = this.data.jobs.concat(res.data.data.jobs)
        // console.log(res)
       this.setData({
          jobs:jobs,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success:(res)=> {
        that.setData({
          windowHeight:res.windowHeight
        });
        // console.log(res.windowHeight);
      }
    });
    // console.log(this.data.windowHeight);
   
    wx.request({
      url:"https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc",
      success:(res)=>{
        console.log(res)
        that.setData({
          jobs:res.data.data.jobs
        })
      }
    })
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
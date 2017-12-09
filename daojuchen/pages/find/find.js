// pages/find/find.js
// var i = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobs:[],
    windowHeigt:0,
    pullUpAllow:true,
    pullLowAllow:true
  },
  tost:function() {
    wx.showActionSheet({
      itemList: ['举报', '屏蔽'],
      success: function(res) {
        console.log(res.tapIndex)
        if(res.tapIndex==0){
        wx.showToast({
          title:'举报成功',
          icon:'success',
          duration:1000
        })} else {
          wx.showToast({
            title:'屏蔽成功',
            icon:'success',
            duration:1000
        })}
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
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
  upper: function() {
    var that = this
    // var timestamp = Date.parse(new Date()) / 1000;
    // var lastTime = this.data.lastLoadTime
    // if (timestamp - lastTime < 0) {
    //     console.log('太快了')
    // } else {
    //     that.setData({ lastLoadTime: timestamp })
        if (this.data.pullUpAllow) {
            console.log('刷新啦')
            that.setData({
                pullUpAllow: false
            })
            wx.showNavigationBarLoading() //在标题栏中显示加载
            // console.log(that.data.classidnow)
            wx.request({
                url: 'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc',//这里放置的是接口的地址
                success: function(res) {
                  var jobs = that.data.jobs.concat(res.data.data.jobs)
                  // console.log(res)
                 that.setData({
                    jobs:jobs,
                  })
                },
                complete: function() {
                    wx.hideNavigationBarLoading() //完成停止加载
                    wx.stopPullDownRefresh() //停止下拉刷新
                    setInterval(() => {
                        that.setData({
                            pullUpAllow: true
                        })
                    }, 3000)
                }
            })
        }
},

  lower:function(){
    var that = this;
    if(that.data.pullLowAllow) {
      that.setData({
        pullLowAllow:false
      })
       console.log('下拉加载');
      wx.showToast({
        title:'加载中',
        icon:'loading',
        duration: 1000,
      });
      setTimeout(function(){
        wx.showToast({
          title:'加载成功',
          icon:'success',
          duration:1000,
        });
        wx.request({
          url:'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc',
          complete:(res)=>{
            console.log(that.data.jobs);
            var jobs = that.data.jobs.concat(res.data.data.jobs)
          that.setData({
              jobs:jobs,
              pullLowAllow:true
            })
          },
        })
      },1000);
    }
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
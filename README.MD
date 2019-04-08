## 前言
最近10几天都在学习小程序的开发，遇到了一些问题和笔记有趣的东西，今天总结了一下，和大家分享

### 1.小程序中的template模块使用
在一个月黑风高的夜晚，我突然发现一个很有意思的东西，那就是template模块，它可以将你定义的一个HTML5模块包住，然后利用template，在你的小程序任意一个页面使用，这样极大的减少了程序中的复制-粘贴，复制-粘贴(一般用于需要循环使用的界面)。下面就用我自己的一个template模块来讲解下。

#### 第一步：创建页面
在pages里面创建存储你template模块的页面，便于其他页面对其的引用


    "pages/index/index",
    "pages/find/find",
    "pages/gift/gift",
    "pages/activity/activity",
    "pages/common/list",//存储template模块的页面
    "pages/white/white"

#### 第二步：创建template模块
template模块实例

     <template name="job_list">
         <view class="br"></view>
         <navigator url="../white/white" class="page_appmsg">
                <view class="page">
                        <view class="page__hd ">
                            <image class="page__thumb" src="{{image}}" mode="aspectFill"/>
                            <view class="page__hd_title">
                                <view class="page__hd_title title">{{title}}</view>
                                <view class="page__hd_title school">{{school}}</view>
                                <view class="page__hd_title request">
                                    <text class="page__hd_title pink">{{pink}}</text>
                                    <text class="page__hd_title time">{{time}}</text>
                                    <view class="page__hd_title cool"><i class="iconfont icon-zan1 active"></i>{{cool}}</view>
                                </view>
                            </view>
                        </view>   
                        <view class='page__ft'>
                         <i class="iconfont icon-jian-copy active"></i>{{page__ft}}}
                        </view>
                </view>
        </navigator>
</template>

在你需要重复使用的html用一个template标签包起来，并给它取个名字 。
（当然了，还有WXSS的编写，这里因为不是很重要我就不放出来了）
完成了这步，你就可以尽情的在你需要这个模板的页面引用这个模块了。


#### 第三步：在各个页面引用template模块 

①在你想要引用的界面的WXSS和WXML上引用template的wxml和wxss，

    @import '../common/list.wxss';
    <import src="../common/list.wxml" />

②在你需要的盒子里面添加template标签，你想要引用那个template模块，就在is里面填哪个模块的名字 

    <template is="job_list" data="{{jobs}}"/>

如果你是在一个循环里面引用的template就需要改为data="{{...item}}"如：
    
    <block wx:for="{{jobs}}" wx:key="{{index}}">
    <template is="job_list" data="{{...item}}"/>
    </block>

代码：
    
      <import src="../common/list.wxml" />
    <view class="swiper-tab">
        <view class="swiper-tab-item {{activeIndex==0?'active':''}}" data-current="0" bindtap="clickTab">活动</view>
        <view class="swiper-tab-item {{activeIndex==1?'active':''}}" data-current="1" bindtap="clickTab">视频</view>
        <view class="swiper-tab-item {{activeIndex==2?'active':''}}" data-current="2" bindtap="clickTab">直播</view>
    </view>
    <swiper current='{{activeIndex}}' bindchange="swiperTab">
        <swiper-item>
            <view class="swiper-item__content">
                <block wx:for="{{jobs}}" wx:key="{{index}}">
                    <template is="job_list" data="{{...item}}"/>
                </block>
            </view>
        </swiper-item>
        <swiper-item>
                <view class="swiper-item__content">
                        <block wx:for="{{jobs}}" wx:key="{{index}}">
                            <template is="job_list" data="{{...item}}"/>
                        </block>
                    </view>
        </swiper-item>
        <swiper-item>
                <view class="swiper-item__content">
                        <block wx:for="{{jobs}}" wx:key="{{index}}">
                            <template is="job_list" data="{{...item}}"/>
                        </block>
                    </view>
        </swiper-item>
    </swiper>



效果图：


![](https://user-gold-cdn.xitu.io/2017/12/10/1603f5826da885e6?w=416&h=733&f=gif&s=707443)

### 2.数据绑定
又是一个月黑风高的夜晚，我在实现点亮的功能的时候，发现我只点了一个地方的点赞，整个页面的点赞都亮了起来，这肯定是不行的，用户明明只对这一个感兴趣，你怎么能全部点亮呢？于是我开始了思考，发现我犯了一个十分愚蠢的问题，那就是没有给我的数据绑定一个值，这就好像没有给喊名字一样：到了饭点你出去大喊一声:儿子,回家吃饭了!结果肯定是家家的儿子都回去吃饭了，然而别人家的饭都还没开始煮呢，你怎么就喊人家回去了呢，你肯定得喊：二狗子，回家吃饭了！别人家的娃才不会也跟着回家。这和点击事件是一个道理的，你必须给你的每项数据绑定一个id，用if语句，将数组遍历一遍，将每个数据的ID拿出来看看，看下你点的这个数据的ID，与数组中哪个相符合。如何成功配对了 ，恭喜，你可以执行点亮操作了！
功能实现如下：
- wxml

        <a wx:if="{{!item.isSelected}}" id="dianzan1" data-id = "{{item.id}}" 
        bindtap="cool">
            <i class="iconfont icon-dianzan1 active"></i>
        </a>
        <a wx:if="{{item.isSelected}}" id="dianzan1" data-id = "{{item.id}}" 
        bindtap="cool">
            <i class="iconfont icon-dianzan1-copy active"></i>
        </a>
在数据中，我不仅给了它一个ID，还给了它一个布尔值，并且全部定为false，这样便可以通过
wx:if="{{!item.isSelected}}" wx:if="{{item.isSelected}}" 来判断展示的是点亮与否。
- js 
    
             cool:function(e) {
             let jobs = this.data.jobs
             for(let key in jobs){                       // 遍历一遍数据
              // console.log(jobs[key].id);           
                                                 //将界面的数据与jobs的数据进行匹配
               if (jobs[key].id === e.currentTarget.dataset.id){ 
                 if (!jobs[key].isSelected){             //处于未点亮状态时的操作
                   jobs[key].isSelected = true;
                   wx.showToast({
                     title: '点赞成功',
                     icon: 'success',
                     duration: 1500,
                   })    
                 }else{                                 //处于点亮时的操作
                   jobs[key].isSelected = false;
                   wx.showToast({
                     title: '取消点赞',
                     icon: 'success',
                     duration: 1500,
                   })
                 }       
               }
             }
             this.setData({                             // 将界面更新
               jobs : jobs,
             });
          
           }, 



- 效果图



![](https://user-gold-cdn.xitu.io/2017/12/10/1603f5bfacc337c8?w=416&h=733&f=gif&s=154699)




### 3.下拉刷新触发过多问题
又是一个月黑风高的夜晚，我突然发现了一个bug！在小程序下拉刷新时，我明明只加了一组数据，然而却刷出来了2到3组数据，（这里我使用的是scroll-view组件的bindscrolltolower属性）


![](https://user-gold-cdn.xitu.io/2017/12/10/1603f5963e05dc22?w=451&h=733&f=gif&s=3092473)


吓得我赶紧回去看了一波代码，如下：

           lower:function(){
    // if(i!=1){
    //   return
    // }i++;
    var that = this;
    // console.log('下拉加载');
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
          })
        },
      })
    },1000);
   
  },
仔细看看，发现并没有逻辑错误，我思前想后，觉得有可能是函数多次触发导致的，于是我在函数的开始加入 console.log('下拉加载');在调试器中，我发现下拉刷新也是跟着出现了2次，为了更加保险，我在page外定义了一个var i = 1；并在函数外面加上了

        if(i!=1){
        return
        }i++;
再次测试，发现只出现了一组数据，由此我确定了这个bug是由于下拉刷新触发过多的原因。但是怎么解决呢，我想了想，觉得可以用一个锁，把这个函数锁起来，等函数执行完毕，在把函数打开。
修改后的函数如下：

        data: {
    jobs:[],
    windowHeigt:0,
    pullUpAllow:true,
    pullLowAllow:true
  },
  
    lower:function(){
    var that = this;
    if(that.data.pullLowAllow) {        //确定开关的开启与否
      that.setData({
        pullLowAllow:false              //关闭开关
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
              pullLowAllow:true            //加载完毕，开启开关
            })
          },
        })
      },1000);
    }
  },
  
结果：

![](https://user-gold-cdn.xitu.io/2017/12/10/1603f58f4093bcdd?w=424&h=180&f=png&s=9111)



## 项目展示
在最后，也把我辛苦Coding了N天的项目展示一下给大家吧
（由于一开始选题的失败，并没有完成什么重要的功能，大家就别说出来了T-T）
- 底部tabBar切换

![](https://user-gold-cdn.xitu.io/2017/12/10/1603f59b6b43e609?w=416&h=733&f=gif&s=711032)

- 图片轮播与界面切换

![](https://user-gold-cdn.xitu.io/2017/12/10/1603f59f6d6a0b95?w=416&h=733&f=gif&s=1494317)
- 点击事件


![](https://user-gold-cdn.xitu.io/2017/12/10/1603f5a232242c4d?w=416&h=733&f=gif&s=890152)
- 下拉刷新与上拉刷新


![](https://user-gold-cdn.xitu.io/2017/12/10/1603f5a5fb0c9e6a?w=416&h=761&f=gif&s=1979921)

## 总结
- 要熟读微信小程序官方文档,勤用小程序自带的API，可以节省很多时间和精力
- 阿里巴巴的iconfont是真的好用，很多图标都可以在上面下载，不仅有png版还有svg版
- Easy Mock 可以建立一个假后台，对于我们学习小程序有很大的帮助
- weui框架对小程序有很大的帮助

## 项目地址
 github：[https://github.com/fsafafaf/daojuchen](https://github.com/fsafafaf/daojuchen)
 
原文链接：[https://segmentfault.com/a/1190000012358393](https://segmentfault.com/a/1190000012358393)

















Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { id: 1, msg: '如何修改账户资金密码？', time: '2019-03-01' },
      { id: 2, msg: '新股中签如何缴款？', time: '2019-03-01' },
    ],
    touch_start: 0,
    touch_end: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  cleanAll:function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空收藏吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.setData({
            items: []
          });
        }
      }
    })
  },
  tapMsg(e) {
    let that = this;
    //触摸时间距离页面打开的毫秒数
    var touchTime = that.data.touch_end - that.data.touch_start;
    //如果按下时间大于350为长按
    if (touchTime > 350) {
      wx.showModal({
        title: '提示',
        content: '确定要取消收藏该记录吗？',
        success: function (sm) {
          if (sm.confirm) {
            let index = e.currentTarget.dataset.i;
            let items = that.data.items;
            items.splice(index, 1);
            that.setData({
              items
            });
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/detail/detail'
      })
    }
  },

  //按下事件开始
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  }
})
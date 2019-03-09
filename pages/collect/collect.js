Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { id: 1, msg: '1312321', time: '2019-1-30'},
      { id: 2, msg: '1312123541', time: '2019-1-30' },
    ]
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
  tapMsg() {

  }
})
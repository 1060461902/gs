Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { id: 1, msg: '1312321' },
      { id: 2, msg: '1312123541' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  cleanAll:function(){
    wx.showModal({
      title: '提示',
      content: '确定要清空收藏吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击确定
        }
      }
    })
  },
  tapMsg() {

  }
})
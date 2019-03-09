Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 1, msg: '1312321', time: '2019-1-30' },
      { id: 2, msg: '1312123541', time: '2019-1-30' },
    ],
    day:0,
    month:0,
    year:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day:options.d,
      month:options.m,
      year:new Date().getFullYear()
    });
  },
  cleanAll: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要本日清空历史记录吗？',
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
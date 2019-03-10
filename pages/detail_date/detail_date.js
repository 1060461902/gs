Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 1, msg: '如何修改账户资金密码？', time: '2019-03-01' },
      { id: 2, msg: '新股中签如何缴款？', time: '2019-03-01' },
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
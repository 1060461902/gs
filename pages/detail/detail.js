Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:'',
    collect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: 'ausdhauishdiuashdui',
      content: '<img src=""/>asdfasdfasdfasd fasdfasdfa sdfasdfasdfasd fasdfas fsadfasd'
    });
  },

  /**
   * 点击收藏
   */
  collect:function(e){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定收藏问题吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.setData({
            collect:true
          });
        }
      }
    })
  },

  /**
   * 点击取消收藏
   */
  uncollect:function(e){
    wx.showModal({
      title: '提示',
      content: '确定取消收藏问题吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.setData({
            collect: false
          });
        }
      }
    })
  }
})
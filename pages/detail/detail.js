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
      title: '新股中签如何缴款？',
      content: '1、在申购的第二天，也就是T+1日，将公布新股申购配号。投资者可通过电话委托、营业部柜台查询、大厅自助委托、钱龙热自助等方式查询自己申购新股的配号。2、在申购的第三天，也就是T+2日，将公布中签号码。投资者可通过与中签号码核对的方式确认是否自己中签。投资者也可通过电话委托、网上交易、柜台查询、自助委托、钱龙热自助等方式查询自己的证券余额，如证券余额中增加了所申购的新股，则表明您已经中签。3、申购的第四天，也就是T+3日，是申购新股的缴款截止日，如果中签，必须保证当日您的账户中有足够中签数量的申购资金，如果不够，请务必于当日10：30之前将资金缴足。4、在缴款后，就已经购得了申购的新股。'
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
    let that = this;
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
//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    title: '欢迎使用智能客服',
  },
  entryMainPage:function(){
    wx.redirectTo({
      url: '/pages/main/main',
    })
  }
})

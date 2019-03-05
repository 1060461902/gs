const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    message_list:[],
    message:''
  },

  onLoad:function(options){
    //获取userInfo
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }

    //默认欢迎
    let message_list = this.data.message_list;
    message_list.push({
      type: "reply-item-text",
      data: { text: "您好，小智为您服务" }
    });
    message_list.push({
      type:'reply-item-feedback',
      data:{
        position: message_list.length,
        id:1
      }
    });
    this.setData({
      message_list
    });
  },

  //底部输入框点击发送时调用
  sendMsg:function(e){
    let that= this;
    let msg = e.detail.value;
    let message_list = this.data.message_list;
    message_list.push({
      type: "ask-item",
      data: { text: msg, head_url: that.data.userInfo.avatarUrl }
    });
    this.setData({
      message_list,
      message:''
    });
  },

  //底部输入框变化时改变message的值
  bindMessage:function(e){
    this.setData({
      message:e.detail.value
    });
  },

  //点击反馈的满意按钮
  content:function(e){
    let position = e.target.dataset.position;
    let message_list = this.data.message_list;
    message_list.splice(position, 1, {
      type: "reply-item-text",
      data: { text: "感谢您的反馈！如还有问题，您可继续提问。" }
    });
    this.setData({
      message_list
    });
  },

  //点击反馈的不满意按钮
  discontent:function(e){
    let position = e.target.dataset.position;
    let message_list = this.data.message_list;
    message_list.splice(position, 1, {
      type: "reply-item-discontent",
      data: {
        id:1,
        position
      }
    });
    this.setData({
      message_list
    });
  },

  //选择不满意的原因
  selectDiscontentReason:function(e){
    let selected = e.detail.value;
    let position = e.target.dataset.position;
    let message_list = this.data.message_list;
    let data = message_list[position].data;
    data.selected = selected;
    data.show_button = true;
    if(selected == 2){
      data.show_input = true;
    }else{
      data.show_input = false;
    }
    message_list[position].data = data;
    this.setData({
      message_list
    });
  },

  //输入不满意的原因
  discontentDetailInput:function(e){
    let input = e.detail.value;
    let position = e.target.dataset.position;
    let message_list = this.data.message_list;
    let data = message_list[position].data;
    data.detail = input;
    message_list[position].data = data;
    this.setData({
      message_list
    });
  },

  //发送不满意的原因
  sendDiscontentReason:function(e){
    let message_list = this.data.message_list;
    let position = e.target.dataset.position;
    let data = message_list[position].data;
    console.log(data);
    message_list.splice(position,1,{
      type: "reply-item-text",
      data: { text: "感谢您的反馈！如还有问题，您可继续提问。" }
    });
    this.setData({
      message_list
    });
  },

  //取消发送反馈
  cancelDiscontentReason:function(e){
    let message_list = this.data.message_list;
    let position = e.target.dataset.position;
    message_list.splice(position, 1, {
      type: "reply-item-text",
      data: { text: "已取消反馈，如还有问题，您可继续提问。" }
    });
    this.setData({
      message_list
    });
  }
})
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    message_list:[],
    message:'',
    scrollTop:0,
    showInput:false,
    showButton:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo:false
  },

  onLoad:function(options){
    //获取userInfo
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      });
    }

    //默认欢迎
    let message_list = this.data.message_list;
    message_list.push({
      type: "reply-item-text",
      data: { text: "您好，小智为您服务" }
    });
    this.setData({
      message_list
    });
  },

  /**
   * 底部输入框点击发送时调用
   */
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
      message:'',
      showInput: false,
      showButton: true
    });

    if(msg == "新股中签怎么付费"){
      this.answer(true,[
        {
          title: '新股中签如何缴款？',
          id: 10
        }
      ]);
    }else{
      this.answer(false, [
        {
          title: '新股中签如何缴款？',
          id: 10
        },
        {
          title: '新股中签，未及时缴款有什么影响？',
          id: 12
        },
        {
          title: 'A股股票配股与增发的缴款时间有何区别？',
          id: 1
        }
      ]);
    }

    this.flashScroll();
  },

  /**
   * 底部输入框变化时改变message的值
   */
  bindMessage:function(e){
    this.setData({
      message:e.detail.value
    });
  },

  /**
   * 点击反馈的满意按钮
   */
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

  /**
   * 点击反馈的不满意按钮
   */
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

  /**
   * 选择不满意的原因
   */
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

  /**
   * 输入不满意的原因
   */
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

  /**
   * 发送不满意的原因
   */
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

  /**
   * 取消发送反馈
   **/
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
  },

  /**
   * 系统回复——返回结果
   * @param arr [{title,id}] 例子:[
          {
            title: '回复内容',
            id: 10
          },
          {
            title: '回复内容',
            id: 12
          }
        ]
   */
  answer:function(isDefinite,arr){
    let message_list = this.data.message_list;
    if (isDefinite){
      message_list.push({
        type: 'reply-item-response',
        data: {
          multi: false,
          response_list: arr
        }
      });
    }else{
      message_list.push({
        type: "reply-item-text",
        data: { text: "未找到匹配问题，以下为相似问题" }
      });
      message_list.push({
        type: 'reply-item-response',
        data: {
          multi: true,
          response_list: arr
        }
      });
    } 
    message_list.push({
      type: 'reply-item-feedback',
      data: {
        position: message_list.length,
        id: 1
      }
    });
    this.setData({
      message_list
    });
  },

  /**
   * 更新滚动条高度
   */
  flashScroll:function(){
    let that = this;

    const query = wx.createSelectorQuery()
    query.select('.items-container').boundingClientRect()
    // query.selectViewport().scrollOffset()
    query.exec(function (res) {
      wx.createSelectorQuery().select('#ask-page').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: res[0].height
        })
      }).exec()
    })
  },

  /**
   * 弹出对话框
   */
  popInput:function(){
    this.setData({
      showInput: true,
      showButton: false
    });
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
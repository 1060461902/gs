Page({

  /**
   * 页面的初始数据
   */
  data: {
    days:[],
    items: [
      { id: 1, msg: '如何修改账户资金密码？', time: '2019-03-01' },
      { id: 2, msg: '新股中签如何缴款？', time: '2019-03-01' },
    ],
    index:0, //true => item;false => calendar
    range: [ '按问题','按时间'],
    touch_start:0,
    touch_end:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    let prevMD = 0;
    switch(currentMonth){
      case 2:case 4:case 6:case 8:case 9:case 11:case 1:
        prevMD = 31;
        break;
      case 3:
        (currentYear % 4 == 0 && currentYear % 100 != 0 || currentYear % 400 == 0) ? prevMD = 29:prevMD = 28;
        break;
      case 5: case 7: case 10: case 12:
        prevMD = 30;
        break;
    }
    let days = [];
    let sum = 0;
    for(let i=0;i<5;i++){
      let a = [];
      for(let j=0;j<6;j++){
        let month = currentMonth;
        let day_template = currentDay - sum
        let day;
        if (day_template > 0){
          day = day_template;
        }else{
          month = month-1>0?month-1:12
          day = prevMD + day_template;
        }
        a.push({
          month,
          day
        })
        sum++;
      }
      days.push(a);
    }
    let a_template = [];
    let final_days = [];
    for(let i=0;i<5;i++){
      a_template.push(days.pop());
    }
    for (let i = 0; i < 5; i++) {
      let temp = [];
      for (let j = 0; j < 6; j++) {
        temp.push(a_template[i].pop());
      }
      final_days.push(temp);
    }
    this.setData({
      days:final_days
    });
  },
  cleanAll: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空历史记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          that.setData({
            items: []
          });
        }
      }
    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  tapDay(){
    
  },
  tapMsg(e){
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
        url:'/pages/detail/detail'
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
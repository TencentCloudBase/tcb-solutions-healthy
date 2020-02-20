// pages/databaseGuide/databaseGuide.js

const app = getApp()
var list = []
Page({
  data:{
    vehicle: [
      { value: '高铁', checked: false },
      { value: '飞机', checked: false },
      { value: '巴事', checked: false},
    ],
     items: [
      { name: '是', value: 1 },
      { name: '否', value: 0 }
    ],
    checkedArr:[],
    isDanger:0
  },
  radioChange(e){
    this.setData({
      isDanger:e.detail.value-0
    })
  },
  formSubmit: function (e) {
    let data =  e.detail.value
    wx.showLoading({
      title: '信息提交中',
    })
    const db = wx.cloud.database()
    console.log(data)
    for(let key in data){
      if (!data[key]){
        wx.showToast({
          title: '请先完成表格',
          icon:'none',
          duration:2000
        })
        return
      }
    }
    db.collection('checkin').add({
      data,
      success: res => {
        wx.hideLoading()
        wx.reLaunch({
          url: '../msg/msg_success',
        })
      },
      fail: err => {
        wx.hideLoading()
        console.error('打卡失败：', err)
        wx.reLaunch({
          url: '../msg/msg_fail',
        })
      }
    })
  },
})
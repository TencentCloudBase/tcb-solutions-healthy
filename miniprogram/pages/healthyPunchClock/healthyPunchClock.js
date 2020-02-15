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
  checkboxChange(e){
    this.setData({
      checkedArr: e.detail.value
    })
  },
  radioChange(e){
    this.setData({
      isDanger:e.detail.value-0
    })
  },
  formSubmit: function (e) {
    let form =  e.detail.value
    console.log(form)
    for(let key in form){
      if (!form[key]){
        wx.showToast({
          title: '请先完成表格',
          icon:'none',
          duration:2000
        })
        return
      }
    }
  }
})
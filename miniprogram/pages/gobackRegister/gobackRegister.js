// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {

    goHBradioItems: [ //是否去过湖北
      { name: '是', value: '0' },
      { name: '否', value: '1'}
    ],
    workPlaceRadioItems: [ //是否返回工作地
      { name: '是', value: '0' },
      { name: '否', value: '1'}
    ],
    withIllTakeRadioItems: [  //是否与病人同乘交通工具
      { name: '是', value: '0' },
      { name: '否', value: '1' }
    ],
    contractillRadioItems: [    // 是否接触过确认或疑似确诊患者
      { name: '是', value: '0' },
      { name: '否', value: '1' }
    ],
    bodyStatusRadioItems: [    // 是否接触过确认或疑似确诊患者
      { name: '是', value: '0' },
      { name: '否', value: '1' }
    ],
    areasHaveRadioItems: [    // 是否接触过确认或疑似确诊患者
      { name: '是', value: '0' },
      { name: '否', value: '1' }
    ],
    checkboxItems: [
      { name: '火车', value: '0', checked: true },
      { name: '飞机', value: '1' }
    ],

    traffic: ["铁路", "飞机", "客运", "自驾", "渡轮"], //铁路/飞机/客运/自驾/渡轮
    trafficIndex: 0
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    var date = date.getDate();
    console.log("当前时间：" + Y + M + D);
    this.setData({
      date: Y + M + D
    })
  },

  //输入信息验证，敏感字符检测
  onAdd: function (e) {
    console.log("1.姓名:" + e.detail.value.name);
    console.log("2.工作地点：/所在校区:" + e.detail.value.place);
    console.log("3.目前是否在湖北省内:" + this.goHBFlag);
    console.log("4.目前是否在工作地/校内:" + this.workPlaceFlag);
    console.log("5.选择假期你所去过的省市:" + "------------------------------"); 
    console.log("6.何时返程：(Picker)日期:" + e.detail.value.date);
    console.log("7.何处返程：(Picker)省市:" + "---------------------");
    console.log("8.返程所乘交通工具： 铁路/飞机/客运/自驾/渡轮:" + e.detail.value.traffic);
    console.log("9.返程所乘车次/航班：(Field):" + e.detail.value.trainnumber);
    console.log("10.过去14天是否与确诊病例乘过同一交通工具:" + this.withIllTakeFlag);
    console.log("11.过去14天是否密切接触过各地确诊病例或定点医院医务人员:" + this.contractillFlag);
    console.log("12.过去14天是否有身体不适:" + this.bodyStatusFlag);
    console.log("13.目前有无咳嗽，发热等症状:" + e.detail.value.bodystatusinfo);
    console.log("14.同行人员/亲戚/近期接触人员中有无 咳嗽，发热等症状/确诊患者:" + e.detail.value.otherManBodyInfo);
    console.log("15.目前居住小区是否有确诊病例:" + this.areasHaveFlag);
    console.log("16.其他备注信息:" + e.detail.value.remark);

    var name = e.detail.value.name
    if (name == null || name == '') {
      wx.showToast({
        icon: 'none',
        title: '姓名不能为空'
      });
      return;
    }

    var text = e.detail.value.name + e.detail.value.place + e.detail.value.trainnumber + e.detail.value.bodystatusinfo + e.detail.value.otherManBodyInfo + e.detail.value.remark
    console.log("敏感字符检测内容：" + text)
    //敏感字符检测
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'msg_sec_check',
      data: {
        text: text
      }
    }).then((res) => {
      console.log("敏感信息检测结果：" + res.result.code);
      if (res.result.code == "200") {
        //检测通过
        this.onAddSec(e)
      } else {
        //执行不通过
        wx.showToast({
          title: '输入内容包含敏感信息,请重新输入',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },

  //返程信息提交
  onAddSec: function (e) {
    var name = e.detail.value.name
    var place = e.detail.value.place
    var date = e.detail.value.date
    var traffic = e.detail.value.traffic
    var trainnumber = e.detail.value.trainnumber
    var bodystatusinfo = e.detail.value.bodystatusinfo
    var otherManBodyInfo = e.detail.value.otherManBodyInfo
    var remark = e.detail.value.remark
    var goHBFlag = this.goHBFlag
    var workPlaceFlag = this.workPlaceFlag
    var withIllTakeFlag = this.withIllTakeFlag
    var contractillFlag = this.contractillFlag
    var bodyStatusFlag = this.bodyStatusFlag
    var goHareasHaveFlagBFlag = this.areasHaveFlag

    wx.showLoading({
      title: '信息提交中',
    })
    const db = wx.cloud.database()
    db.collection('GOBACKINFO').add({
      data: {
        name: name,
        place: place,
        date: date,
        traffic: traffic,
        trainnumber: trainnumber,
        bodystatusinfo: bodystatusinfo,
        bodystatusinfo: bodystatusinfo,
        otherManBodyInfo: otherManBodyInfo,
        goHBFlag: goHBFlag,
        workPlaceFlag: workPlaceFlag,
        withIllTakeFlag: withIllTakeFlag,
        contractillFlag: contractillFlag,
        bodyStatusFlag: bodyStatusFlag,
        goHareasHaveFlagBFlag: goHareasHaveFlagBFlag,
        remark: remark
      },
      success: res => {
        wx.hideLoading()
        console.log('返程信息登记成功，记录 _id: ', res._id)
        wx.reLaunch({
          url: '../msg/msg_success',
        })
        console.log('返程信息登记成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.hideLoading()
        console.error('返程信息登记失败：', err)
        wx.reLaunch({
          url: '../msg/msg_fail',
        })
      }
    })
  },

  goHBRadioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.goHBFlag = e.detail.value
    var radioItems = this.data.goHBradioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      goHBradioItems: radioItems
    });
  },

  workPlaceRadioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.workPlaceFlag = e.detail.value
    var radioItems = this.data.workPlaceRadioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      workPlaceRadioItems: radioItems
    });
  },


  withIllTakeRadioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.withIllTakeFlag = e.detail.value
    var radioItems = this.data.withIllTakeRadioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      withIllTakeRadioItems: radioItems
    });
  },


  contractillRadioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.contractillFlag = e.detail.value
    var radioItems = this.data.contractillRadioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      contractillRadioItems: radioItems
    });
  },

  bodyStatusRadioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.bodyStatusFlag = e.detail.value
    var radioItems = this.data.bodyStatusRadioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      bodyStatusRadioItems: radioItems
    });
  },

  areasHaveRadioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.areasHaveFlag = e.detail.value
    var radioItems = this.data.areasHaveRadioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      areasHaveRadioItems : radioItems
    });
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  goHome: function() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

})
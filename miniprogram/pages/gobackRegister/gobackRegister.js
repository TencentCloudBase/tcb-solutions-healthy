// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
    formData: {
      title: '返程登记',
      subTitle: '注意事项：作为用户和产品之间的桥梁，社交分享在产品的发展过程中扮演了重要角色',
      qs: [{
          name: '姓名',
          type: 'text',
          placeholder: '请输入姓名',
          value: ''
        },
        {
          name: '工作地点',
          type: 'text',
          placeholder: '请输入工作地点',
          value: ''
        },
        {
          name: '目前是否在湖北省内',
          type: 'radio',
          items: [ //是否去过湖北
            {
              name: '是',
              value: '0'
            },
            {
              name: '否',
              value: '1'
            }
          ],
          value: ''
        },
        {
          name: '目前是否在工作地/校内',
          type: 'radio',
          items: [{
              name: '是',
              value: '0'
            },
            {
              name: '否',
              value: '1'
            }
          ],
          value: ''
        },
        {
          name: '假期去过的省市',
          type: 'text',
          placeholder: '请输入假期去过的省市',
          value: ''
        },
        {
          name: '何时返程',
          type: 'date',
          value: ''
        },
        {
          name: '何处返程',
          type: 'region',
          value: ['湖北省', '武汉市', '江汉区'],
        },
        {
          name: '返程所乘交通工具',
          type: 'range',
          range: ["铁路", "飞机", "客运", "自驾", "渡轮"],
          value: ''
        },
        {
          name: '返程所乘车次/航班',
          type: 'text',
          placeholder: '请输入车次/航班',
          value: ''
        }, {
          name: '过去14天是否与确诊病例乘过同一交通工具',
          type: 'radio',
          items: [{
              name: '是',
              value: '0'
            },
            {
              name: '否',
              value: '1'
            }
          ],
          value: ''
        },
        {
          name: '过去14天是否密切接触过各地确诊病例或定点医院医务人员',
          type: 'radio',
          items: [{
              name: '是',
              value: '0'
            },
            {
              name: '否',
              value: '1'
            }
          ],
          value: ''
        },
        {
          name: '过去14天是否有身体不适',
          type: 'radio',
          items: [{
              name: '是',
              value: '0'
            },
            {
              name: '否',
              value: '1'
            }
          ],
          value: ''
        },
        {
          name: '目前有无咳嗽，发热等症状',
          type: 'text',
          placeholder: '请输入身体状况',
          value: ''
        },
        {
          name: '同行人员/亲戚/近期接触人员中有无 咳嗽，发热等症状/确诊患者',
          type: 'text',
          placeholder: '请输入同行人员/亲戚/近期接触人员身体状况',
          value: ''
        },
        {
          name: '目前居住小区是否有确诊病例',
          type: 'radio',
          items: [{
              name: '是',
              value: '0'
            },
            {
              name: '否',
              value: '1'
            }
          ],
          value: ''
        },
        {
          name: '其他备注信息',
          type: 'text',
          placeholder: '请输入内容',
          value: ''
        }
      ]
    }
  },

  onLoad: function(options) {
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
  onAdd: async function(e) {
    const data = e.detail;
    let text = '';

    if (data[0].value === '') {
      wx.showToast({
        icon: 'none',
        title: '姓名不能为空'
      });
      return;
    }

    data.forEach(item => {
      text += item.value;
    })

    console.log("敏感字符检测内容：" + text)
    //敏感字符检测
    wx.cloud.init();
    const res = await wx.cloud.callFunction({
      name: 'msg_sec_check',
      data: {
        text: text
      }
    })
    console.log("敏感信息检测结果：" + res.result.code);
    if (res.result.code == "200") {
      //检测通过
      this.onAddSec(data)
    } else {
      //执行不通过
      wx.showToast({
        title: '输入内容包含敏感信息,请重新输入',
        icon: 'none',
        duration: 3000
      })
    }
  },

  //返程信息提交
  onAddSec: function(formData) {
    wx.showLoading({
      title: '信息提交中',
    })
    const db = wx.cloud.database()
    const data = {
      name: formData[0].value,
      place: formData[1].value,
      date: formData[5].value,
      traffic: formData[7].value,
      trainnumber: formData[8].value,
      bodystatusinfo: formData[12].value,
      otherManBodyInfo: formData[13].value,
      wentprovinces: formData[4].value,
      gobackwhere: formData[5].value,
      goHBFlag: formData[2].value,
      workPlaceFlag: formData[3].value,
      withIllTakeFlag: formData[9].value,
      contractillFlag: formData[10].value,
      bodyStatusFlag: formData[11].value,
      goHareasHaveFlagBFlag: formData[14].value,
      remark: formData[15].value
    }

    db.collection('GOBACKINFO').add({
      data,
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
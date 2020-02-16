// components/weForm/weForm.js
Component({
  /**
   * Component properties
   */
  properties: {
    formData: {
      type: Object,
      value: {},
    }
  },

  /**
   * Component initial data
   */
  data: {
    time: +new Date(),
    date: '2019-01-01',
    index: 0,
    rangeIndex: 0,
    region: ['湖北省', '武汉市', '江汉区'],
    qs: []
  },

  observers: {
    'formData': function(formData) {
      console.log(111, formData)
      this.setData({
        qs: formData.qs
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    // 更新文本框的值
    updateText: function(e) {
      const index = +e.target.id;
      const value = e.detail.value;
      this.data.qs[index].value = value
    },
    // 更新单选题的值
    radioChange: function(e) {
      const index = +e.target.id;
      const value = e.detail.value;
      this.data.qs[index].value = value;
    },
    // 时间选择器修改值
    dateChange: function(e) {
      const index = +e.target.id;
      const value = e.detail.value;
      this.setData({
        date: value
      })
      this.data.qs[index].value = value;
    },
    // 更新所选地区
    changeRegion: function(e) {
      const index = +e.target.id;
      const value = e.detail.value;
      this.setData({
        'region': e.detail.value
      })
      this.data.qs[index].value = this.data.region;
    },
    // 改变范围
    rangeChange: function(e) {
      const index = +e.target.id;
      const value = e.detail.value;
      this.setData({
        rangeIndex: value
      })
      this.data.qs[index].value = this.data.rangeIndex;
    },
    // 提交数据
    onAdd: function(e) {
      console.log(this.data.qs)
      this.triggerEvent('onAdd', this.data.qs);
    }
  }
})
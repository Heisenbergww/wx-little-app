// pages/detail/traffic/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    type: "",
    islast: true,
    infoList: [],
    needpage: 0,
    pageStep: 10,
    show: false
  },
  askData: function () {
    var _this = this
    var type = this.data.type;
    var info = this.data.info;
    var url = ''
    if (type == "partNum") {
      url = 'https://www.wangyuhui.site/criminalsearch/getLawByPartNum?' + type + '=' + info.partnum + '&pageSize=10&pageNum=' + this.data.needpage
    } else if (type == "chapterNum") {
      url = 'https://www.wangyuhui.site/securitysearch/getLawByChapterNum?chapterNum=' + info.chapternum + '&pageSize=10&pageNum=' + this.data.needpage
    } else if (type == "sectionNum") {
      url = 'https://www.wangyuhui.site/securitysearch/getLawByChapterNumAndSectionNum?chapterNum=' + info.chapternum + '&sectionNum=' + info.sectionnum + '&pageSize=10&pageNum=' + this.data.needpage
    } else if (type == 'search') {
      url = encodeURI('https://www.wangyuhui.site/securitysearch/getLawByQueryString?queryString=' + info.keywords + '&pageSize=10&pageNum=' + this.data.needpage)
    }
    console.log(url)
    function chapterfilter(data) {
      var result = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].partNum == info.partnum) {
          result.push(data[i])
        }
      }
      console.log(result)
      return result
    }
    wx.request({
      url: url,
      method: 'get',
      header: { 'content-type': 'application/json' },
      data: {
      },
      success: function (res) {
        console.log(res.data.content)// 服务器回包信息
        var infoList = res.data.content
        if (type == "chapterNum") {
          infoList = chapterfilter(res.data.content)
        }
        console.log(infoList)
        var allList = _this.data.infoList.concat(infoList)
        // console.log(array)
        _this.setData({
          infoList: allList,
          islast: res.data.last
        })
        if (allList.length == 0) {
          _this.setData({
            show: true
          })
        }
      },
      fail: function (res) {
        console.log(res)// 服务器回包信息   
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var type = options.type
    //获取上级的点击事件
    var info = JSON.parse(options.info)
    _this.setData({
      info: info,
      type: type
    })
    _this.askData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底' + this.data.islast)
    if (!this.data.islast) {
      this.setData({
        needpage: this.data.needpage + 1
      })
      this.askData()
    } else {
      console.log('没有了')
      wx.showToast({
        title: '没有数据啦!',
        icon: 'loading',
        duration: 1000
      });
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
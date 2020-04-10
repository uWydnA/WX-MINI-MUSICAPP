// pages/songlist/songlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songId: '',
    datalist: {},
    isLoading: true,
    showShare: true,
    animation: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `http://musicapi.leanapp.cn/playlist/detail?id=${options.id}`,
      success: res => {
        this.setData({
          datalist: res.data
        }, () => {
          setTimeout(() => {
            this.setData({
              isLoading: false
            })
          }, 1000)
        })
      }
    })
    this.setData({
      songId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    this.animation = wx.createAnimation()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showShareModal() {
    this.setData({
      showShare: !this.data.showShare
    }, () => {
      if (this.data.showShare) {
        this.animation.translate(0, 0).step()
        this.setData({
          animation: this.animation.export()
        })
      } else {
        this.animation.translate(0, -200).step()
        this.setData({
          animation: this.animation.export()
        })
      }
    })
  }
})
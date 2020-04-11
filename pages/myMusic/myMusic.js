// pages/myMusic/myMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: wx.getStorageSync('users') || null,
    playlist: [],
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://musicapi.leanapp.cn/user/detail?uid=32953014',
      success: res => {
        this.setData({
          userinfo: res.data
        }, () => {
          wx.setStorageSync('userinfo', this.data.userinfo)
        })
      }
    })
    wx.request({
      url: 'https://musicapi.leanapp.cn/user/playlist?uid=32953014',
      success: res => {
       if(res.data.code===200){
        this.setData({
          playlist: res.data.playlist,
        },()=>{
          console.log(this.data.playlist)
          setTimeout(()=>{
            this.setData({
              isLoading: false
            })
          },1000)
        })
       }
      }
    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleSongList(ev){
    wx.navigateTo({
      url: `/pages/songlist/songlist?id=${ev.currentTarget.dataset.id}`,
    })
  },
  goToFm(){
    wx.switchTab({
      url: '/pages/fm/fm',
    })
  }
})
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist:[],
    hotlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://musicapi.leanapp.cn/banner',
      success:res=>{
        if(res.data.code===200){
          console.log(res.data.banners)
          this.setData({
            bannerlist:res.data.banners
          })
        }
      }
    })
    wx.request({
      url: 'http://musicapi.leanapp.cn/top/playlist',
      success:res=>{
        if(res.data.code===200){
          wx.hideLoading()
          console.log(res.data)
          this.setData({
            hotlist:res.data.playlists
          },()=>{
            console.log(this.data.hotlist)
          })
        }else{
         
        }
      }
    })
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

  }
})
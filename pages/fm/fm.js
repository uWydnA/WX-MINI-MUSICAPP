// pages/fm/fm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList:[],
    nowPlay:{},
    nowNum:wx.getStorageSync('nowNum')||0
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
    wx.request({
      url: 'http://musicapi.leanapp.cn/personalized/newsong',
      success:res=>{
        if(res.data.code===200){
          this.setData({
            playList:res.data.result
          },()=>{
            let nowplay = wx.getStorageSync('prevPlay')||this.data.playList[this.data.nowNum]
            this.setData({
              nowPlay:nowplay
            },()=>{
              console.log(this.data.nowPlay)
            })
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

  },
  changeMusic () {
    this.setData({
      nowNum:this.data.nowNum===this.data.playList.length-1?0:this.data.nowNum+1
    },()=>{
      wx.setStorageSync('prevPlay', this.data.playList[this.data.nowNum])
      wx.setStorageSync('nowNum', this.data.nowNum)
      this.setData({
        nowPlay:this.data.playList[this.data.nowNum]
      })
    })
  }
})
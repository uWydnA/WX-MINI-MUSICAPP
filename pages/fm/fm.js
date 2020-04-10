// pages/fm/fm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList:[],
    nowPlay:{},
    nowNum:wx.getStorageSync('nowNum')||0,
    isLoading:true,
    isPlay:true,
    src:'http://yolandy.com/mp3/ANZA.mp3'
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
    this.audioCtx = wx.createAudioContext('myAudio')
    wx.request({
      url: 'http://musicapi.leanapp.cn/personalized/newsong',
      success:res=>{
        if(res.data.code===200){
          this.setData({
            playList:res.data.result
          },()=>{
            let nowplay = wx.getStorageSync('prevPlay')||this.data.playList[this.data.nowNum]
            this.setData({
              nowPlay:nowplay,
              isLoading:false
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
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  playmusic (data) {
    if(data.detail){
      this.audioPlay()
    }else{
      this.audioPause()
    }
  },
  changeMusic () {
    this.setData({
      nowNum:this.data.nowNum===this.data.playList.length-1?0:this.data.nowNum+1,
      isLoading:true
    },()=>{
      wx.setStorageSync('prevPlay', this.data.playList[this.data.nowNum])
      wx.setStorageSync('nowNum', this.data.nowNum)
      this.setData({
        nowPlay:this.data.playList[this.data.nowNum],
        isLoading:false
      })
    })
  }
})
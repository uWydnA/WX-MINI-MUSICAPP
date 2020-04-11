// pages/fm/fm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList:[],
    nowPlay:{},
    nowNum:0,
    isLoading:true,
    isPlay:true,
    src:''
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
      url: 'https://musicapi.leanapp.cn/personalized/newsong',
      success:res=>{
        if(res.data.code===200){
          this.setData({
            playList:res.data.result
          },()=>{
            let nowplay = wx.getStorageSync('prevPlay')||this.data.playList[this.data.nowNum]
            this.setData({
              nowPlay:nowplay,
              isLoading:false
            },()=>{
              this.setData({
                src:`https://music.163.com/song/media/outer/url?id=${this.data.nowPlay.id}.mp3`
              })
              wx.request({
                url: `https://musicapi.leanapp.cn/song/detail?ids=${this.data.nowPlay.id}`,
                success:res=>{
                  if(res.data.code===200){
                    this.setData({
                      privileges:res.data.privileges[0],
                    })
                  }
                }
              })
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
    this.playmusic({detail:false})
    this.setData({
      nowNum:this.data.nowNum===this.data.playList.length-1?0:this.data.nowNum+1,
      isLoading:true
    },()=>{
      wx.setStorageSync('prevPlay', this.data.playList[this.data.nowNum])
      wx.setStorageSync('nowNum', this.data.nowNum)
      this.setData({
        nowPlay:this.data.playList[this.data.nowNum],
        isLoading:false
      },()=>{
        this.setData({
          src:`https://music.163.com/song/media/outer/url?id=${this.data.nowPlay.id}.mp3`
        })
      })
    })
  }
})
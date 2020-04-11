// pages/thisMusic/thisMusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playList: [],
    nowPlay: {},
    animation:null,
    nowNum: 0,
    songActive:false,
    privileges: {},
    isLoading: true,
    isPlay: true,
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `https://musicapi.leanapp.cn/song/detail?ids=${options.ids}`,
      success: res => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.setData({
            privileges: res.data.privileges[0],
            nowPlay: res.data.songs[0],
          }, () => {
            wx.setNavigationBarTitle({
              title: this.data.nowPlay.name,
            })
          })
        }
      }
    })
    wx.request({
      url: `https://musicapi.leanapp.cn/playlist/detail?id=${options.songlist}`,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            playList: res.data.playlist
          }, () => {
            console.log(this.data.nowPlay)
            this.setData({
              src:`https://music.163.com/song/media/outer/url?id=${this.data.nowPlay.id}.mp3`,
              isLoading: false
            })
            this.data.playList.tracks.forEach((val, idx) => {
              if (val.id === this.data.nowPlay.id) {
                this.setData({
                  nowNum: idx
                })
              }
            })
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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
    this.setData({
      songActive:true
    })
  },
  audioPause: function () {
    this.audioCtx.pause()
    this.setData({
      songActive:false
    })
  
  },
  playmusic(data) {
    if (data.detail) {
      this.audioPlay()
    } else {
      this.audioPause()
    }
  },
  changeMusic() {
    this.playmusic({detail:false})
    this.setData({
      nowNum: this.data.nowNum + 1
    }, () => {
      wx.request({
        url: `https://musicapi.leanapp.cn/song/detail?ids=${this.data.playList.tracks[this.data.nowNum].id}`,
        success: res => {
          if (res.data.code === 200) {
            this.setData({
              nowPlay: res.data.songs[0],
            }, () => {
              this.setData({
                src:`https://music.163.com/song/media/outer/url?id=${this.data.nowPlay.id}.mp3`
              })
              wx.setNavigationBarTitle({
                title: this.data.nowPlay.name,
              })
            })
          }
        }
      })
    })
  }
})
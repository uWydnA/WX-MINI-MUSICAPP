// utils/player/player.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time: {
      type: String
    },
    popularity: {
      type: String
    },
    duration:{
      type:Number
    },
    isPlayed:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    percent: 0,
    likeicon: '../../image/fm/py.png',
    playicon: '../../image/fm/q8.png',
    isPlay:false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeMusic() {
      clearInterval(this.t)
      this.setData({
        percent:0,
        playicon:'../../image/fm/q8.png'
      })
      this.triggerEvent("sendEvent");
    },
    handleLike() {
      this.setData({
        likeicon: this.data.likeicon === '../../image/fm/py.png' ? '../../image/fm/q0.png' : '../../image/fm/py.png'
      })
    },
    touchClick (ev) {
      // console.log('click',ev.changedTouches[0])
    },
    touchMove (ev) {
      // console.log('move',ev.changedTouches[0])
      // this.setData({
      //   percent:(ev.changedTouches[0].pageX-63)*496/750
      // },()=>{
      //   console.log('percent',this.data.percent)
      // })
    },
    handlePlay() {
      if (this.data.playicon === '../../image/fm/q8.png') {
        this.triggerEvent("playOrNo",true);
        this.t = setInterval(() => {
          if(this.data.percent>=100){
            this.setData({
              percent:100,
              playicon:'../../image/fm/q8.png'
            })
            clearInterval(this.t)
          }else{
            this.setData({
              percent: this.data.percent + (1/(this.properties.duration/1000)*100)
            })
          }
        }, 1000)
      } else {
        this.triggerEvent("playOrNo",false);
        clearInterval(this.t)
      }
      this.setData({
        playicon: this.data.playicon === '../../image/fm/q8.png' ? '../../image/fm/q4.png' : '../../image/fm/q8.png'
      })

    }
  }
})
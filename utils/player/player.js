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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    percent: 0,
    likeicon: '../../image/fm/py.png',
    playicon: '../../image/fm/q8.png'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeMusic() {
      console.log(this.properties.time)
      this.triggerEvent("sendEvent");
    },
    handleLike() {
      this.setData({
        likeicon: this.data.likeicon === '../../image/fm/py.png' ? '../../image/fm/q0.png' : '../../image/fm/py.png'
      })
    },
    handlePlay() {
      if (this.data.playicon === '../../image/fm/q8.png') {
        this.t = setInterval(() => {
          if(this.data.percent===1){
            clearInterval(this.t)
          }else{
            this.setData({
              percent: this.data.percent + (1/(this.properties.duration/1000))
            },()=>{
              console.log('percent',this.data.percent)
            })
          }
        }, 10)
      } else {
        clearInterval(this.t)
      }
      this.setData({
        playicon: this.data.playicon === '../../image/fm/q8.png' ? '../../image/fm/q4.png' : '../../image/fm/q8.png'
      })

    }
  }
})
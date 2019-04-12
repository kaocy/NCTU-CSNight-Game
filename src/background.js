
import Drawable from './drawable'
import imageStorage from './imageStorage'

// 遊戲的背景畫面 利用畫兩張圖片的局部範圍 達到捲動的效果
class Background extends Drawable {
  constructor () {
    super()
    this.empty = null
    this.speed = 1 // 設定背景圖片捲動速度
  }

  move () {
    this.y += this.speed

    // 如果圖片移動超出範圍 重設y座標
    if (this.y >= this.canvasHeight) {
      this.y = 0
    }

    this.draw()
  }

  draw () {
    this.context.drawImage(imageStorage.background, this.x, this.y)
    // 在第一張圖片上額外畫一張 達到循環捲動的效果
    this.context.drawImage(imageStorage.background, this.x, this.y - this.canvasHeight)
  }
}

export default Background


import Drawable from 'drawable'
import { imageStorage } from 'main'

// 遊戲的背景畫面 利用畫兩張圖片的局部範圍 達到捲動的效果
class Background extends Drawable {
  constructor (roll = false) {
    super()
    this.empty = null
    this.speed = 1 // 設定背景圖片捲動速度
    this.roll = roll

    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
  }

  // 遊戲背景不需要捲動
  move () {
    if (this.roll) {
      this.y += this.speed

      // 如果圖片移動超出範圍 重設y座標
      if (this.y >= this.canvasHeight) {
        this.y = 0
      }
    }
    this.draw()
  }

  draw () {
    this.context.drawImage(imageStorage.background, this.x, this.y, this.canvasWidth, this.canvasHeight)
    if (this.roll) {
      // 在第一張圖片上額外畫一張 達到循環捲動的效果
      this.context.drawImage(imageStorage.background, this.x, this.y - this.canvasHeight, this.canvasWidth, this.canvasHeight)
    }
  }
}

export default Background

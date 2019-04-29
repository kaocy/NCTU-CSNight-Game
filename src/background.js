
import Drawable from './drawable'
import { imageStorage } from './main'

// 遊戲的背景畫面 利用畫兩張圖片的局部範圍 達到捲動的效果
class Background extends Drawable {
  constructor () {
    super()
    this.empty = null

    this.move = this.move.bind(this)
    this.draw = this.draw.bind(this)
  }

  // 遊戲背景不需要捲動
  move () {
    this.draw()
  }

  draw () {
    this.context.drawImage(imageStorage.background, this.x, this.y, this.canvasWidth, this.canvasHeight)
  }
}

export default Background

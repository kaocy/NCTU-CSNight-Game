
// 所有畫布上會出現的物件的基底
class Drawable {
  constructor () {
    this.speed = 0
    // this.canvasWidth = 0
    // this.canvasHeight = 0
  }

  init (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  // 抽象函式
  draw () {}
}

export default Drawable

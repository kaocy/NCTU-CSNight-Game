
// 所有畫布上會出現的物件的基底
class Drawable {
  constructor () {
    this.speed = 0
    this.type = ''
    this.init = this.init.bind(this)
  }

  init (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}

export default Drawable

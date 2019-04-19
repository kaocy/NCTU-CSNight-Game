
// 所有畫布上會出現的物件的基底
class Drawable {
  constructor () {
    this.speed = 0
    this.type = ''
    this.collidableWith = []
    this.isCollided = false

    this.init = this.init.bind(this)
    this.isCollidedWith = this.isCollidedWith.bind(this)
  }

  init (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  isCollidedWith (object) {
    // 不需要偵測碰撞的情形 如我方太空船和我方子彈
    if (this.collidableWith.indexOf(object.type) === -1) return false

    return (this.x < object.x + object.width)  &&
           (this.x + this.width > object.x)    &&
           (this.y < object.y + object.height) &&
           (this.y + this.height > object.y)
  }

  // 抽象函式
  draw () {}
  clear () {}
  move () {}
}

export default Drawable

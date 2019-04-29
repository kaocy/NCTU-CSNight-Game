
// 儲存載入的圖片 不用每次畫都重新載入
class ImageStorage {
  constructor () {
    this.numImages = 7
    this.numLoaded = 0

    this.background = new Image()
    this.ship = new Image()
    this.bullet = new Image()
    this.enemy = new Image()
    this.enemy1 = new Image()
    this.enemy2 = new Image()
    this.enemyBullet = new Image()

    this.background.onload = () => {
      this.numLoaded++
    }
    this.ship.onload = () => {
      this.numLoaded++
    }
    this.bullet.onload = () => {
      this.numLoaded++
    }
    this.enemy.onload = () => {
      this.numLoaded++
    }
    this.enemy1.onload = () => {
      this.numLoaded++
    }
    this.enemy2.onload = () => {
      this.numLoaded++
    }
    this.enemyBullet.onload = () => {
      this.numLoaded++
    }

    // 設定圖片來源
    this.background.src = '../assets/imgs/bg1-1.png'
    this.ship.src = '../assets/imgs/ship.png'
    this.bullet.src = '../assets/imgs/bullet.png'
    this.enemy.src = '../assets/imgs/book1.png'
    this.enemy1.src = '../assets/imgs/book1.png'
    this.enemy2.src = '../assets/imgs/book2.png'
    this.enemyBullet.src = '../assets/imgs/bullet_enemy.png'

    this.finishLoading = this.finishLoading.bind(this)
  }

  finishLoading () {
    return this.numImages === this.numLoaded
  }
}

export default ImageStorage

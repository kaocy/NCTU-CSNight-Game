
import backgroundImg from 'assets/imgs/bg1-1.png'
import shipImg from 'assets/imgs/ship.png'
import bulletImg from 'assets/imgs/bullet.png'
import enemyImg from 'assets/imgs/enemy.png'
import enemyBulletImg from 'assets/imgs/bullet_enemy.png'

// 儲存載入的圖片 不用每次畫都重新載入
class ImageStorage {
  constructor () {
    this.numImages = 5
    this.numLoaded = 0

    this.background = new Image()
    this.ship = new Image()
    this.bullet = new Image()
    this.enemy = new Image()
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
    this.enemyBullet.onload = () => {
      this.numLoaded++
    }

    // 設定圖片來源
    this.background.src = backgroundImg
    this.ship.src = shipImg
    this.bullet.src = bulletImg
    this.enemy.src = enemyImg
    this.enemyBullet.src = enemyBulletImg

    this.finishLoading = this.finishLoading.bind(this)
  }

  finishLoading () {
    return this.numImages === this.numLoaded
  }
}

export default ImageStorage

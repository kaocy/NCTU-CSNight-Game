
// 儲存載入的圖片 不用每次畫都重新載入
let imageStorage = new function () {
  this.background = new Image()
  this.ship = new Image()
  this.bullet = new Image()
  this.enemy = new Image()
  this.enemyBullet = new Image()

  // 全部圖片載入好才開始遊戲
  let numImages = 5
  let numLoaded = 0
  function imageLoaded () {
    numLoaded++
    if (numLoaded === numImages) {
      window.init()
    }
  }

  // 載入所有需要的圖片
  this.background.onload = function () {
    imageLoaded()
  }
  this.ship.onload = function () {
    imageLoaded()
  }
  this.bullet.onload = function () {
    imageLoaded()
  }
  this.enemy.onload = function () {
    imageLoaded()
  }
  this.enemyBullet.onload = function () {
    imageLoaded()
  }

  // 設定圖片來源
  this.background.src = '../imgs/bg.png'
  this.ship.src = '../imgs/ship.png'
  this.bullet.src = '../imgs/bullet.png'
  this.enemy.src = '../imgs/enemy.png'
  this.enemyBullet.src = '../imgs/bullet_enemy.png'
}()

export default imageStorage

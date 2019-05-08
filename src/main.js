
import Game from 'game'
import ImageStorage from 'imageStorage'
import SoundStorage from 'soundStorage'
import 'assets/stylesheets/index.scss'

let game = new Game()
let imageStorage = new ImageStorage()
let soundStorage = new SoundStorage()
let startButton = document.getElementById('start')
let scoreElement = document.getElementById('score')
let restartElement = document.getElementById('game-over')

// 確認圖片和音效都載入完成
let checkLoading = window.setInterval(() => {
  if (imageStorage.finishLoading() && soundStorage.finishLoading()) {
    window.clearInterval(checkLoading)

    // game初始完才開始
    if (game.init()) {
      document.getElementById('init').style.height = `${window.innerHeight}px`
    }
  }
}, 100)

startButton.addEventListener('click', () => {
  window.sid = document.getElementById('sid').value
  document.getElementById('init').style.display = 'none'
  game.introduce()
})
restartElement.addEventListener('click', game.restart)

/**
 * The animation loop.
 * Calls the requestAnimationFrame shim to optimize the game loop and draws all game objects.
 * This function must be a gobal function and cannot be within an object.
 */
function animate () {
  // 打完敵人就重置
  if (game.enemyPool.getAliveObjects().length === 0) {
    game.setEnemy()
  }

  // 更新四元樹內所有物件所屬的區域並偵測碰撞
  game.quadTree.clear()
  game.quadTree.insert(game.ship)
  game.quadTree.insert(game.ship.bulletPool.getAliveObjects())
  game.quadTree.insert(game.enemyPool.getAliveObjects())
  game.quadTree.insert(game.enemyBulletPool.getAliveObjects())
  game.detectCollision()

  // 更新顯示的分數
  scoreElement.innerHTML = game.playerScore

  // 如果還沒死掉才會重複animate
  if (game.ship.alive) {
    window.requestAnimFrame(animate)

    game.background.move()
    game.ship.move()
    game.ship.fire()
    game.ship.bulletPool.animate()
    game.enemyPool.animate()
    game.enemyBulletPool.animate()
  }
}

/**
 * 幫psuedo element加入style setter
 */
let UID = {
  _current: 0,
  getNew: function () {
    this._current++
    return this._current
  }
}
HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
  let _this = this
  let _sheetId = 'pseudoStyles'
  let _head = document.head || document.getElementsByTagName('head')[0]
  let _sheet = document.getElementById(_sheetId) || document.createElement('style')
  _sheet.id = _sheetId
  let className = 'pseudoStyle' + UID.getNew()

  _this.className += ' ' + className

  _sheet.innerHTML += ' .' + className + ':' + element + '{' + prop + ':' + value + '}'
  _head.appendChild(_sheet)
  return this
}

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

export { game, imageStorage, soundStorage, animate }

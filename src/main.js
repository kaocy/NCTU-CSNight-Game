
import Game from './game'

let game = new Game()

window.init = function () {
  if (game.init()) {
    game.ship.draw()
    animate()
  }
}

/**
 * The animation loop.
 * Calls the requestAnimationFrame shim to optimize the game loop and draws all game objects.
 * This function must be a gobal function and cannot be within an object.
 */
function animate () {
  window.requestAnimFrame(animate)
  game.background.move()
  game.ship.move()
  game.ship.fire()
  game.ship.bulletPool.animate()
  game.enemyPool.animate()
  game.enemyBulletPool.animate()

  game.quadTree.clear()
  game.quadTree.insert(game.ship)
  game.quadTree.insert(game.ship.bulletPool.getAliveObjects())
  game.quadTree.insert(game.enemyPool.getAliveObjects())
  game.quadTree.insert(game.enemyBulletPool.getAliveObjects())
  game.detectCollision()
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

export { game }


import backgroundAudio from 'assets/sounds/kick_shock.wav'
import gameOverAudio from 'assets/sounds/game_over.wav'
import laserAudio from 'assets/sounds/laser.wav'
import explosionAudio from 'assets/sounds/explosion.wav'

// 音效池
class SoundPool {
  constructor (size, type) {
    this.size = size // 陣列的大小
    this.pool = []
    this.type = type // 音效的種類
    this.currentSound = 0

    this.init = this.init.bind(this)
    this.get = this.get.bind(this)
  }

  // 根據不同的音效種類 在陣列中塞入固定數量的音效
  init () {
    if (this.type === 'laser') {
      for (let i = 0; i < this.size; i++) {
        let laser = new Audio(laserAudio)
        laser.volume = .12
        laser.load()
        this.pool.push(laser)
      }
    }
    else if (this.type === 'explosion') {
      for (let i = 0; i < this.size; i++) {
        let explosion = new Audio(explosionAudio)
        explosion.volume = .12;
        explosion.load()
        this.pool.push(explosion)
      }
    }
  }

  get () {
    let sound = this.pool[this.currentSound]
    if(sound.currentTime === 0 || sound.ended) {
      sound.play()
    }
    this.currentSound = (this.currentSound + 1) % this.size;
  }
}

// 如果音效是觸發事件才會發生(像是子彈擊中敵人) 則預先將該音效存在音效池
class SoundStorage {
  constructor () {
    this.laser = new SoundPool(10, 'laser')
    this.laser.init()
    this.explosion = new SoundPool(20, 'explosion')
    this.explosion.init()

    this.backgroundAudio = new Audio(backgroundAudio)
    this.backgroundAudio.loop = true
    this.backgroundAudio.volume = .25
    this.backgroundAudio.load()
    this.gameOverAudio = new Audio(gameOverAudio)
    this.gameOverAudio.loop = true
    this.gameOverAudio.volume = .25
    this.gameOverAudio.load()

    this.finishLoading = this.finishLoading.bind(this)
  }

  finishLoading () {
    // 用readyState確認音效完全載入且可以播放
    return (this.gameOverAudio.readyState === 4) &&
           (this.backgroundAudio.readyState === 4)
  }
}

export default SoundStorage

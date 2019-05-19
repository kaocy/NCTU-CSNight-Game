
import backgroundImg from 'assets/imgs/bg1-1.png'
import boy1Img from 'assets/imgs/boy1.png'
import boy2Img from 'assets/imgs/boy2.png'
import boy3Img from 'assets/imgs/boy3.png'

// 儲存載入的圖片 不用每次畫都重新載入
class ImageStorage {
  constructor () {
    this.numImages = 4
    this.numLoaded = 0

    this.background = new Image()
    this.boy1 = new Image()
    this.boy2 = new Image()
    this.boy3 = new Image()

    this.background.onload = () => {
      this.numLoaded++
    }
    this.boy1.onload = () => {
      this.numLoaded++
    }
    this.boy2.onload = () => {
      this.numLoaded++
    }
    this.boy3.onload = () => {
      this.numLoaded++
    }

    // 設定圖片來源
    this.background.src = backgroundImg
    this.boy1.src = boy1Img
    this.boy2.src = boy2Img
    this.boy3.src = boy3Img

    this.finishLoading = this.finishLoading.bind(this)
  }

  finishLoading () {
    return this.numImages === this.numLoaded
  }
}

export default ImageStorage

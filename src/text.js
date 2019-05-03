
// 對話匡 類似打字機
class Text {
  constructor (lineHeight = 60, maxWidth = 500, xpos = 100, ypos = (window.innerHeight / 2) ) {
    this.content = ''
    this.contentArr = []
    this.lineCount = 0
    this.wordCount = 0
    this.speed = 1
    this.lineHeight = lineHeight
    this.maxWidth = maxWidth
    this.xpos = xpos
    this.ypos = ypos
    this.startY = ypos
    this.complete = false

    this.init = this.init.bind(this)
    this.clear = this.clear.bind(this)
    this.register = this.register.bind(this)
    this.cancelRegister = this.cancelRegister.bind(this)
    this.splitText = this.splitText.bind(this)
    this.animateText = this.animateText.bind(this)
  }

  init (content, callback) {
    this.content = content
    this.xpos = (this.canvasWidth - this.maxWidth) / 2
    this.callback = callback
    this.splitText()
    // this.register()
  }

  clear () {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  register () {
    this.animate = window.setInterval(this.animateText, 200)
  }

  cancelRegister () {
    window.clearInterval(this.animate)
  }

  // 寫字的function
  animateText () {
    this.clear()

    if (!this.complete) {
      let currentLine = this.contentArr[this.lineCount]
      this.wordCount += this.speed
      this.ypos = this.startY + this.lineHeight * this.lineCount

      // 目前這行寫完就換行
      if (this.wordCount > currentLine.length) {
        this.wordCount = 0
        this.lineCount++
      }

      // 寫出目前這行
      this.context.fillText(currentLine.substr(0, this.wordCount), this.xpos, this.ypos)

      // 全部的字寫完了，要把interval關掉
      if (this.lineCount > this.contentArr.length - 1) {
        this.complete = true
        this.cancelRegister()
        this.clear()

        // 如果有傳callback(下一個開始的function)進來就呼叫
        if (this.callback !== undefined) {
          this.callback()
        }
        return
      }

      // 把之前的幾行字都寫出來  
      for(let i = 0; i < this.contentArr.length; i++) {
        if (i < this.lineCount) {
          this.context.fillText(this.contentArr[i], this.xpos, (this.startY + this.lineHeight * i))
        }
      }
    }
  }

  // 把字根據寬度切割到陣列中
  splitText () {
    let words = [...this.content]
    let lineNumber = 0
    let lineOfText = ''

    words.forEach(word => {
      let currentText = lineOfText + word
      let textWidth = this.context.measureText(currentText).width
      if (textWidth > (this.maxWidth - 10)) {
        lineOfText = word
        lineNumber++
      }
      else {
        lineOfText = currentText
      }

      this.contentArr[lineNumber] = lineOfText
    })
  }
}

export default Text

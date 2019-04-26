
// 對話匡 類似打字機
class Text {
  constructor (lineHeight = 60, maxWidth = 400, xpos = 100, ypos = 300) {
    this.content = ''
    this.contentArr = []
    this.lineCount = 0
    this.lineHeight = lineHeight
    this.maxWidth = maxWidth
    this.xpos = xpos
    this.ypos = ypos
    this.startY = ypos
    this.wordCount = 0
    this.speed = 1
    this.animate = true
    this.complete = false

    this.init = this.init.bind(this)
    this.clear = this.clear.bind(this)
    this.splitText = this.splitText.bind(this)
    this.animateText = this.animateText.bind(this)
  }

  init (content) {
    this.content = content
    this.xpos = (this.canvasWidth - this.maxWidth) / 2    
    this.splitText()
    this.register()
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

  // 把字串切成陣列 因為
  splitText () {
    let words = this.content.split(' ')
    let lineNumber = 0
    let lineOfText = ''

    words.forEach(word => {
      let currentText = lineOfText + word + ' '
      let textWidth = this.context.measureText(currentText).width
      if (textWidth > (this.maxWidth - 10)) {
        lineOfText = word + ' '
        lineNumber++
      }
      else {
        lineOfText = currentText
      }

      this.contentArr[lineNumber] = lineOfText
    })
  }

  animateText () {
    this.clear()

    if (this.animate) {
      let currentLine = this.contentArr[this.lineCount]
      this.wordCount += this.speed
      this.ypos = this.startY + this.lineHeight * this.lineCount

      if (this.wordCount > currentLine.length - 1) {
        this.wordCount = 0
        this.lineCount++
        
        if (this.lineCount > this.contentArr.length - 1) {
          this.animate = false
          this.complete = true
        }
      }

      this.context.fillText(currentLine.substr(0, this.wordCount), this.xpos, this.ypos)
    }

    // Write Out The Previous Lines Too  
    for(let i = 0; i < this.contentArr.length; i++) {
      if (i < this.lineCount) {
        this.context.fillText(this.contentArr[i], this.xpos, (this.startY + this.lineHeight * i))
      }
    }
  }
}

export default Text

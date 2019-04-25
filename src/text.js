
// 儲存載入的圖片 不用每次畫都重新載入
class Text {
  constructor (lineHeight = 18, maxWidth = 100, xpos = 10, ypos = 10) {
    this.content = ''
    this.contentArr = []
    this.lineCount = 0
    this.lineHeight = lineHeight
    this.maxWidth = maxWidth
    this.xpos = xpos
    this.ypos = ypos
    this.startY = ypos
    this.wordCount = 0
    this.speed = 2
    this.animate = true
    this.complete = false

    this.init = this.init.bind(this)
    this.splitText = this.splitText.bind(this)
    this.animateText = this.animateText.bind(this)
  }

  init (content) {
    this.content = content
    this.splitText()
    this.animate = window.setInterval(this.animateText, 50)
  }

  clear () {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  splitText () {
    let words = this.content.split(' ')
    let lineNumber = 0
    let lineOfText = ''

    words.forEach(word => {
      let currentText = lineOfText + word + ' '
      let textWidth = this.context.measureText(currentText)
      
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
      // console.log(currentLine)
      this.wordCount += this.speed
      this.ypos = this.startY + this.lineHeight * this.lineCount

      if (this.wordCount > currentLine.length - 1) {
        this.wordCount = 0
        this.lineCount++
        
        if(this.lineCount > this.contentArr.length - 1){
          window.clearInterval(this.animate)
          this.animate = false
          this.complete = true
        }
      }
      // this.context.clearRect(0, 0, canvasWidth, canvasHeight)
      this.context.fillText(currentLine.substr(0, this.wordCount), this.xpos, this.ypos)  
    }

    // Write Out The Previous Lines Too  
    for(let i = 0; i < this.contentArr.length; i++) {
      if (i < this.lineCount) {
        this.context.fillText(this.contentArr[i], this.xpos, (this.startY + this.lineheight * i))
      }
    }
  }
}

export default Text

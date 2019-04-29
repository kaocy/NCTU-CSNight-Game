
import { KEY_STATUS } from 'keyboard'

let KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

const handleLeftStart = (e) => {
  e.preventDefault()
  e.stopPropagation()
  KEY_STATUS[KEY_CODES[37]] = true
  console.log('on on on')
}

const handleRightStart = (e) => {
  e.preventDefault()
  e.stopPropagation()
  KEY_STATUS[KEY_CODES[39]] = true
}

const handleLeftEnd = (e) => {
  e.stopPropagation()
  KEY_STATUS[KEY_CODES[37]] = false
}

const handleRightEnd = (e) => {
  e.stopPropagation()
  KEY_STATUS[KEY_CODES[39]] = false
}


// 監聽觸控事件
document.getElementById('left').addEventListener("touchstart", handleLeftStart, false)
document.getElementById('left').addEventListener("touchend", handleLeftEnd, false)
document.getElementById('right').addEventListener("touchstart", handleRightStart, false)
document.getElementById('right').addEventListener("touchend", handleRightEnd, false)
document.oncontextmenu = () => false

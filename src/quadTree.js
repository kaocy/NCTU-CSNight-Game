
/**
 * 四元樹: 用來將平面分為四等分區域
 * 因為平面上有很多物件 如果直接兩兩判斷是否發生碰撞 會影響效能
 * 所以將平面分區域 只需要判斷同區域內的物間是否會碰撞
 *
 * 註: 如果子區域內的物件過多 子區域內可能會再繼續切割
 *
 * 切割區域編號如下
 *   0  |  1
 *  ---------
 *   2  |  3
 */
class QuadTree {
  constructor (bound = { x: 0, y: 0, width: 0, height: 0 }, level = 0) {
    this.bound = bound // 區域座標和寬高
    this.level = level // 是第幾層
    this.children = [] // 儲存四個子節點
    this.objects = [] // 儲存該節點的物件
    this.maxLevel = 2 // 最大分層數量(不會無限切割)
    this.maxNumObject = 10 // 每個節點的最多儲存物件數量

    this.clear = this.clear.bind(this)
    this.split = this.split.bind(this)
    this.getIndex = this.getIndex.bind(this)
    this.insert = this.insert.bind(this)
    this.getAllObjects = this.getAllObjects.bind(this)
    this.findPossibleCollided = this.findPossibleCollided.bind(this)
  }

  clear () {
    // 要先遞迴把子節點clear
    this.children.forEach(child => child.clear())
    this.children = []
    this.objects = []
  }

  // 切割成四等份
  split () {
    let subWidth = this.bound.width / 2
    let subHeight = this.bound.height / 2

    this.children[0] = new QuadTree({
      x: this.bound.x,
      y: this.bound.y,
      width: subWidth,
      height: subHeight
    }, this.level + 1)

    this.children[1] = new QuadTree({
      x: this.bound.x + subWidth,
      y: this.bound.y,
      width: subWidth,
      height: subHeight
    }, this.level + 1)

    this.children[2] = new QuadTree({
      x: this.bound.x,
      y: this.bound.y + subHeight,
      width: subWidth,
      height: subHeight
    }, this.level + 1)

    this.children[3] = new QuadTree({
      x: this.bound.x + subWidth,
      y: this.bound.y + subHeight,
      width: subWidth,
      height: subHeight
    }, this.level + 1)
  }

  // 判斷object屬於當前四個區域的哪一個 如果橫跨區域回傳-1
  getIndex (object) {
    let midPoint = {
      x: this.bound.x + this.bound.width / 2,
      y: this.bound.y + this.bound.height / 2
    }

    // 判斷是上下半部 左右半部
    let atTop = (object.y + object.height < midPoint.y)
    let atBottom = (object.y > midPoint.y)
    let atLeft = (object.x + object.width < midPoint.x)
    let atRight = (object.x > midPoint.x)

    if (atTop && atLeft) return 0
    if (atTop && atRight) return 1
    if (atBottom && atLeft) return 2
    if (atBottom && atRight) return 3

    return -1
  }

  // 把object放進該節點
  insert (object) {
    // 如果是陣列就每個都insert
    if (object instanceof Array) {
      object.forEach(obj => this.insert(obj))
      return
    }

    // 如果有切割過子區域
    if (this.children.length) {
      let index = this.getIndex(object)

      // 如果在某個子區域內
      if (index != -1) {
        this.children[index].insert(object)
        return
      }
    }

    this.objects.push(object)

    // 如果該節點內的物件數量過多且沒有超過最大層數
    if (this.objects.length > this.maxNumObject && this.level < this.maxLevel) {
      // 如果還沒切割過就切割
      if (!this.children.length) {
        this.split()
      }

      // 把該節點的物件搬移到四個子區域內 (跨區域就保留)
      for (let i = 0; i < this.objects.length; i++) {
        let index = this.getIndex(this.objects[i])
        if (index != -1) {
          this.children[index].insert((this.objects.splice(i, 1))[0])
          i--
        }
      }
    }
  }

  // 回傳該節點以下的所有物件 (包含該節點和所有子區域內的)
  getAllObjects () {
    let array = []
    this.children.forEach(child => array.push(...child.getAllObjects()))
    array.push(...this.objects)
    return array
  }

  // 回傳該節點以下的所有可能和object碰撞的所有物件 (包含該節點和object所屬子區域內的)
  findPossibleCollided (object) {
    let array = []
    let index = this.getIndex(object)
    if (index != -1 && this.children.length) {
      array.push(...this.children[index].findPossibleCollided(object))
    }
    array.push(...this.objects)
    return array
  }
}

export default QuadTree

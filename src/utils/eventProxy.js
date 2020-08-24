/**
 * 一个发布-订阅模式的实现
 * 用来解决两个任意组件间的数据传递（一般是非父子组件，因为父子组件用props更好）
 **/
const eventProxy = {
  onObj: {},    // 每次都触发
  oneObj: {},   // 只触发一次
  on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = []
    }

    this.onObj[key].push(fn)
  },
  one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = []
    }

    this.oneObj[key].push(fn)
  },
  off(key) {
    this.onObj[key] = []
    this.oneObj[key] = []
  },
  trigger(...args) {
    let key, a
    if (args.length === 0) {
      return false
    }
    key = args[0]
    a = [].concat(Array.prototype.slice.call(args, 1))

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, a)
      }
    }
    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, a)
        this.oneObj[key][i] = undefined
      }
      this.oneObj[key] = []
    }
  }
}

export default eventProxy

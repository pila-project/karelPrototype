

class Tree {
  constructor(name, children) {
    this.name = name
    this.children = children
  }

  addChild(child) {
    this.children.push(child)
  }

  toString() {
    return this._toString(0)
  }

  _toString(indent) {
    var s = ''
    for (var i = 0; i < indent; i++) {
      s += '  '
    }
    s += this.name
    s += '\n' 
    for (var i = 0; i < this.children.length; i++) {
      let child = this.children[i]
      s += child._toString(indent+1)
    }   
    return s
  }
}

export default Tree
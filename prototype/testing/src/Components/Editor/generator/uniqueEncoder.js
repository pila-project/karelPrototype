class UniqueEncoder {

  static nameMap = {};
  static index = 0;

  static getEncoding(str) {
    if(str in UniqueEncoder.nameMap) {
      return UniqueEncoder.nameMap[str]
    }
    let name = UniqueEncoder.getNextUnique()
    UniqueEncoder.nameMap[str] = name
    return name
  }

  static getNextUnique() {
    let next = 'fn' + UniqueEncoder.index
    UniqueEncoder.index += 1
    return next
  }

}

export default UniqueEncoder
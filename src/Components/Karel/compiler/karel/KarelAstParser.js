
import TokenScanner from '../scanner/TokenScanner.js'
import Tree from '../tree/Tree.js'

/**
 * This class was written Dec 2019.
 * I thought the KarelParser was needlessly
 * complex. Upon investigation I reminded myself
 * how hard it is to come up with a general solution
 * that isn't standard compilation. Reasons its so hard
 * 1. function calls
 * 2. keeping variables (like repeat counters)
 * 3. keeping vars with function calls
 */
class KarelAstParser {

  // public, please call me

  parse(text) {
    console.log(text)
    this.scanner = new TokenScanner()
    this.scanner.setIgnoreWhitespaceFlag(true);
    this.scanner.setInput(text);
    return this.parseRun()
  }

  // private helpers

  parseRun() {
    this.verifyToken("main")
    this.verifyToken("(")
    this.verifyToken(")")
    let body = this.parseCodeBlock()
    return new Tree('run', [body])
  }

  parseCodeBlock() {
    this.verifyToken("{")
    var block = []
    while (true) {
       let token = this.nextToken();
       if (token.text == "}") break;
       this.saveToken(token);
       var stmt = this.parseStatement();
       block.push(stmt);
    }
    return new Tree('block',block)
  }

  parseStatement() {
    let name = this.nextToken().text
    console.log('name', name)
    this.verifyToken("(");
    this.verifyToken(")");
    this.verifyToken(";");
    let child = new Tree(name, [])
    console.log('test', name, child.toString())
    return new Tree('call', [child])
  }

  verifyToken(tk) {
    this.scanner.verifyToken(tk)
  }

  nextToken() {
    return this.scanner.nextToken()
  }

  saveToken(tk) {
    this.scanner.saveToken(tk)
  }

}

export default KarelAstParser
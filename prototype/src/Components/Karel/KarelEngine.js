
import KarelCompiler from './compiler/karelCompiler.js'
import Swal from 'sweetalert2'

class KarelEngine {

  constructor() {
  }

  runCode(codeText, world) {
    let javaCode = this.convertToJava(codeText)
    this.compiler = new KarelCompiler(world)
    let functions = this.compiler.compile(javaCode)
    let isValid = this.validate(functions)
    this.heartbeat()
    if(!isValid) {
      this.compilerWarning('Your program is empty')
    }
    return isValid
  }

  compilerWarning(message) {
    Swal.fire({
      title: 'Warning',
      html: message,
      icon: 'warning',
      toast:true,
    })
  }

  heartbeat() {
    // execute one step
    this.compiler.executeStep((results) => {
      // when finished executing, do another
      // (unless you are done) in 400ms
      if(!results.isDone) {
        setTimeout(() => {
          this.heartbeat()
        }, 400)
      }
    })
  }

  validate(functions) {
    let hasRun = false
    for (var i = 0; i < functions.length; i++) {
      let fn = functions[i]
      let name = fn[1]
      if(name == 'run') {
        hasRun = true
        let body = fn[2]
        // this means the run method is empty
        if(body.length < 2) {
          return false
        }
      }
    }
    return hasRun
  }

  convertToJava(codeText) {
    var java = `public class MyProgram extends Karel {
      ${codeText}
    }
    `
    java = java.replace("main", "public void run");

    // this is a lame hack. On flight couldn't remember
    // the javascript method for "replace all"
    java = java.replace("var", "int")
    java = java.replace("var", "int")
    return java
  }

}

export default KarelEngine
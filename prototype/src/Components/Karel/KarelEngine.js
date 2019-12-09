
import KarelCompiler from './compiler/karelCompiler.js'
import Swal from 'sweetalert2'

class KarelEngine {

  constructor() {
    this.lineToBlockID = {};
  }

  runCode(codeText, world, editor) {
    let javaCode = this.convertToJava(codeText)
    this.compiler = new KarelCompiler(world)
    let functions = this.compiler.compile(javaCode)
    let isValid = this.validate(functions)
    this.heartbeat(editor)
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

  heartbeat(editor) {
    // execute one step
    this.compiler.executeStep((results) => {
      // when finished executing, do another
      // (unless you are done) in 400ms
      if(!results.isDone) {
        setTimeout(() => {
          this.heartbeat(editor)
        }, 400)
      }
      let blockID = this.lineToBlockID[results.lineNumber];
      editor.highlightBlock(blockID);
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

  // convertToJava(codeText) {
  //   var java = `public class MyProgram extends Karel {
  //     ${codeText}
  //   }
  //   `
  //   java = java.replace("main", "public void run");

  //   // this is a lame hack. On flight couldn't remember
  //   // the javascript method for "replace all"
  //   java = java.replace("var", "int")
  //   java = java.replace("var", "int")
  //   return java
  // }

  convertToJava(codeText) {
    const codeLines = codeText.split('\n');
    const cleanedCodeLines = [];
    let lineNo = 1 // Start at 1 because the first line is java boilerplate
    let blockID = undefined;
    for (const line of codeLines)
    {
      if (line.trim().startsWith('highlightBlock')) {
        blockID = line.split(/'/)[1].split(/'/)[0];
        continue;
      }
      cleanedCodeLines.push(line);
      this.lineToBlockID[lineNo] = blockID;
      lineNo += 1;
    }
    cleanedCodeLines.unshift('public class MyProgram extends Karel {');
    cleanedCodeLines.push('}');
    let java = cleanedCodeLines.join('\n');
    java = java.replace("main", "public void run");

    // this is a lame hack. On flight couldn't remember
    // the javascript method for "replace all"
    java = java.replace("var", "int")
    java = java.replace("var", "int")

    return java
  }

}

export default KarelEngine

import KarelCompiler from './compiler/karelCompiler.js'
import Swal from 'sweetalert2'

/**
 * Class: Karel Engine
 * -------------------
 * This class is responsible for linking between the world
 * and the editor. It reduces the need for each IDE version
 * to recreate this logic. It might also be worthwhile to
 * include refs to the buttons in the longness of time. 

 * WARNING: assumes that the editor is a BlocklyEditor
 **/

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

class KarelEngine {

  stop(){
    if (this.heartbeatTimeout != null){
      clearTimeout(this.heartbeatTimeout);
    }
    if (this.compiler != null) {
      this.compiler.stop();
    }
  }

  step(world, editor) {
    if(this.compiler == null) {
      this.compiler = this.compileBlockly(world, editor)
    }
    this.compiler.executeStep((results) => {
      let blockID = this.lineToBlockID[results.lineNumber];
      editor.highlightBlock(blockID);
    })
  }

  // this function is meant to be stateless, in that
  // it doesn't require any set up to be called.
  runCode(world, editor, callback) {
    this.compiler = this.compileBlockly(world, editor)
    
    if(this.compiler == null) {
      this.compilerWarning('Your program is empty')
    } else {
      this.heartbeat(editor, callback)
    }

    // let the caller know if the code didn't compile
    // returns "isValid"
    return this.compiler != null
  }

  // after this method is called, the compiler is
  // set up as well as lineToBlockID. If successful
  // returns the compiler
  compileBlockly(world, editor) {
    let codeText = editor.getCode()
    let javaCode = this.processBlocklyText(codeText)
    let compiler = new KarelCompiler(world)
    let functions = compiler.compile(javaCode)
    let isValid = this.validate(functions)
    if(!isValid) {
      return null
    }
    return compiler
  }

  compilerWarning(message) {
    Swal.fire({
      title: 'Warning',
      html: message,
      icon: 'warning',
      toast:true,
    })
  }

  heartbeat(editor, callback) {
    // execute one step
    this.compiler.executeStep((results) => {
      // when finished executing, do another
      // (unless you are done) in 400ms
      if(!results.isDone) {
        this.heartbeatTimeout = setTimeout(() => {
          this.heartbeat(editor, callback)
        }, 400)
      } else {
        if(callback) callback()
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


  processBlocklyText(codeText) {
    this.lineToBlockID = {}
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
    java = java.replaceAll("var", "int")
    java = java.replace("FRONT_CLEAR", "frontIsClear()")
    console.log('java', java)
    return java
  }

  

}

export default KarelEngine
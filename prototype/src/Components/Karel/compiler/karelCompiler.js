
import KarelVM from './karel/KarelVM.js'
import KarelParser from './karel/KarelParser.js'
import KarelAstParser from './karel/KarelAstParser.js'
import {ReturnIns} from './vm/VM.js'
/**
 * Class: KarelCompiledEngine
 * --------------------------
 * This class is in charge of compiling a piece of Karel
 * code into some abstraction such that it can execute 
 * the program one step at a time. Implements the same
 * interface as the karelEvalEngine.
 */

/**
 * Warning: Dec 2019
 * When porting Karel to React I implemented the world using
 * the react "state" model. This made "stepping" truly complex.
 * to avoid changing the underlying code too much I implemented
 * a work around. The step function doesn't call its callback
 * until both: the state has been updated, and the compiler has
 * finished doing its thing. There is likely a more elegant
 * solution. To execute this properly with methods (think supporting
 * recursion) we are still going to need some version of call stack
 */
class KarelCompiler {

   constructor(karel) {
      karel.setStepCallback(() => this.worldStepFinished())
      this.vm = new KarelVM(karel);
   }

   // public: run this to compile a string to be executed
   compile(text) {
      // var parser = new KarelAstParser()
      // var ast = parser.parse(text)
      // console.log(ast.toString())
      this.vm.resetTempCounter();
      var parser = new KarelParser();
      parser.setInput(text);
      parser.readImport();
      var karelClass = parser.readClass();
      var token = parser.nextToken();
      if(token.text != "") {
         throw new Error("Found " + token + " after your Karel class. Only one class allowed in the online Karel");
      }
      var baseClass = karelClass[2];
      var functionMap = karelClass[3];

      var functions = [];
      var functionNames = [];
      for(var fnName in functionMap) {
         var fn = functionMap[fnName];
         functionNames.push(fnName);
         functions.push(fn);
      }
      console.log(functionNames)
      this.vm.setUserFnNames(functionNames);
      for(var i = 0; i < functions.length; i++) {
         var fn = functions[i];
         var code = [];
         this.vm.compile(fn[2], code);
         code.push(new ReturnIns());
         this.vm.functions[fn[1]] = code;
      }
      this.vm.reset();
      this.vm.startCheck();

      return functions
   }

   // public: run this to execute the next step. Works
   // with a callbackFn which will be called when the step
   // is done. The callbackFn will be told if the program 
   // is finished and what line number was just executed.
   executeStep(callbackFn) {
      console.log('step started')
      // we need to keep track of the callback function
      this.callbackFn = callbackFn
      this.isEngineFinished = false
      if (!this.vm.cf) {
         this.callbackFn({isDone:true})
      } else {
         // first, assume that you haven't changed world state
         this.vm.changedWorld = false
         var running = true;
         while (running) {
            if (this.vm.atStatementBoundary()) running = false;
            // make the vm step
            this.vm.step();
         }
         this.isEngineFinished = true
         // at this point there are two cases. If you didn't
         // change the world, then you can directly call the callback
         if(!this.vm.changedWorld) {
            this.callbackFn({
               isDone:false,
               lineNumber:this.vm.getCurrLineNum()
            })
         }
         // if you made a change to the world, you have to 
         // wait for the callback. Programmers of KarelWorld
         // are responsible for calling the callback. 
      }
   }

   // if the world "state" is changed, then it will call this function
   // once react has finished with the state update.
   worldStepFinished() {
      console.log('step finished')
      
      // to avoid a deadlock condition, you must busy wait
      // if the engine hasn't finished
      if(this.isEngineFinished) {
         this.callbackFn({
            isDone:false,
            lineNumber:this.vm.getCurrLineNum()
         })
      } else {
         setTimeout(() => this.worldStepFinished(), 100)
      }
   }
}

export default KarelCompiler

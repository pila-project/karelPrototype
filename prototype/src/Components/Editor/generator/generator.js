/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import { Block } from 'blockly/blockly-node';

// import UniqueEncoder from './uniqueEncoder.js'

// function autoFormatFnName(original) {
//     return UniqueEncoder.getEncoding(original)
// }

Blockly.JavaScript['test_react_field'] = function (block) {
    return 'console.log(\'custom block\');\n';
};

Blockly.JavaScript['test_react_date_field'] = function (block) {
    return 'console.log(' + block.getField('DATE').getText() + ');\n';
};

Blockly.JavaScript['karel_main'] = function (block) {
    var statements_program = Blockly.JavaScript.statementToCode(block, 'program');
    return 'main(){\n' + statements_program + '}\n';
};

Blockly.JavaScript['karel_move'] = function (block) {
    return 'move();\n'
};

// Blockly.JavaScript['karel_call'] = function (block) {
//     var name = block.getFieldValue('NAME')
//     name = autoFormatFnName(name)
//     return `${name}();\n`
// };

Blockly.JavaScript['karel_turn_left'] = function (block) {
    return 'turnLeft();\n'
};

Blockly.JavaScript['karel_place_stone'] = function (block) {
    return 'placeStone();\n'
};

Blockly.JavaScript['karel_pickup_stone'] = function (block) {
    return 'pickStone();\n'
};

Blockly.JavaScript['karel_front_is_clear'] = function (block) {
    var code = 'frontIsClear';
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['karel_stones_present'] = function (block) {
    var code = 'stonesPresent';
    return [code, Blockly.JavaScript.ORDER_NONE];
}

// Blockly.JavaScript['karel_procedure'] = function (block) {
//     var statements_body = Blockly.JavaScript.statementToCode(block, 'BODY');
//     var name = block.getFieldValue('NAME')
//     name = autoFormatFnName(name)
//     return `public void ${name}() {
//         ${statements_body}
//     }`
// }

Blockly.JavaScript['karel_if_front_dropdown'] = function(block) {
    var dropdown_condition = block.getFieldValue('CONDITION');
    var statements_then = Blockly.JavaScript.statementToCode(block, 'THEN');
    var code = 'if (' + dropdown_condition + ') {\n';
    code += statements_then + '\n'
    code += '}\n'
    return code;
};

Blockly.JavaScript['karel_if_dropdown'] = function(block) {
    var dropdown_condition = block.getFieldValue('CONDITION');
    var statements_then = Blockly.JavaScript.statementToCode(block, 'THEN');
    var code = 'if (' + dropdown_condition + ') {\n';
    code += statements_then + '\n'
    code += '}\n'
    return code;
};

Blockly.JavaScript['karel_if_stone_dropdown'] = function(block) {
    var dropdown_condition = block.getFieldValue('CONDITION');
    var statements_then = Blockly.JavaScript.statementToCode(block, 'THEN');
    var code = 'if (' + dropdown_condition + ') {\n';
    code += statements_then + '\n'
    code += '}\n'
    return code;
};

Blockly.JavaScript['karel_while_dropdown'] = function(block) {
    var dropdown_condition = block.getFieldValue('CONDITION');
    var statements_loop = Blockly.JavaScript.statementToCode(block, 'LOOP');
    var code = 'while (' + dropdown_condition + ') {\n';
    code += statements_loop + '\n'
    code += '}\n'
    return code;
  };

Blockly.JavaScript['karel_while_front_dropdown'] = function(block) {
    var dropdown_condition = block.getFieldValue('CONDITION');
    var statements_loop = Blockly.JavaScript.statementToCode(block, 'LOOP');
    var code = 'while (' + dropdown_condition + ') {\n';
    code += statements_loop + '\n'
    code += '}\n'
    return code;
  };

Blockly.JavaScript['karel_while_stone_dropdown'] = function(block) {
  var dropdown_condition = block.getFieldValue('CONDITION');
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'LOOP');
  var code = 'while (' + dropdown_condition + ') {\n';
  code += statements_loop + '\n'
  code += '}\n'
  return code;
};

// This generator is a slight modification of the built-in generator for `procedures_defnorerturn`.
// Source for `procedures_defnoreturn` generator at https://github.com/google/blockly/blob/master/generators/javascript.js
Blockly.JavaScript['procedures_defnoargsnoreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var xfix1 = '';
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    xfix1 += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
        block);
  }
  if (Blockly.JavaScript.STATEMENT_SUFFIX) {
    xfix1 += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
        block);
  }
  if (xfix1) {
    xfix1 = Blockly.JavaScript.prefixLines(xfix1, Blockly.JavaScript.INDENT);
  }
  var loopTrap = '';
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.JavaScript.prefixLines(
        Blockly.JavaScript.injectId(Blockly.JavaScript.INFINITE_LOOP_TRAP,
        block), Blockly.JavaScript.INDENT);
  }
  var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
  var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
      Blockly.JavaScript.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.JavaScript.INDENT + 'return ' + returnValue + ';\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }

  // Modification for Karel: Changed from `function funcName(args){...}` to `public void funcName(args){...}`
  // var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
  //     xfix1 + loopTrap + branch + xfix2 + returnValue + '}';
  var code = 'public void ' + funcName + '(' + args.join(', ') + ') {\n' +
      xfix1 + loopTrap + branch + xfix2 + returnValue + '}';

  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;
  return null;
};

// This generator is a copy of the built-in generator for `procedures_callnorerturn`.
// Source for `procedures_callnoreturn` generator at https://github.com/google/blockly/blob/master/generators/javascript.js
Blockly.JavaScript['procedures_callnoargsnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  var tuple = Blockly.JavaScript['procedures_callreturn'](block);
  return tuple[0] + ';\n';
};
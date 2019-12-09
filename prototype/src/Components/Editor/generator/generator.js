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

Blockly.JavaScript['karel_turn_left'] = function (block) {
    return 'turnLeft();\n'
};

Blockly.JavaScript['karel_place_stone'] = function (block) {
    return 'placeStone();\n'
};

Blockly.JavaScript['karel_pickup_stone'] = function (block) {
    return 'pickupStone();\n'
};

Blockly.JavaScript['karel_front_is_clear'] = function (block) {
    var code = 'frontIsClear';
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['karel_stones_present'] = function (block) {
    var code = 'stonesPresent';
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['karel_if_front_dropdown'] = function(block) {
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
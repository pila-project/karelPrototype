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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks


import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

var testReactField = {
  "type": "test_react_field",
  "message0": "custom field %1",
  "args0": [
    {
      "type": "field_react_component",
      "name": "FIELD",
      "text": "Click me"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_react_field'] = {
  init: function() {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
  }
};

var reactDateField = {
  "type": "test_react_date_field",
  "message0": "date field %1",
  "args0": [
    {
      "type": "field_react_date",
      "name": "DATE",
      "date": "01/01/2020"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_react_date_field'] = {
  init: function() {
    this.jsonInit(reactDateField);
    this.setStyle('loop_blocks');
  }
};

var karelMain = {
  "type": "karel_main",
  "message0": "main %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "program"
    }
  ],
  "colour": 240,
  "tooltip": "Main function",
  "helpUrl": "Put blocks in here"
}

Blockly.Blocks['karel_main'] = {
  init: function() {
    this.jsonInit(karelMain);
  }
}

var karelMove = {
  "type": "karel_move",
  "message0": "move forward",
  "previousStatement": null,
  "nextStatement": null,
}

Blockly.Blocks['karel_move'] = {
  init: function() {
    this.jsonInit(karelMove);
    this.setStyle('loop_blocks');
  }
};

var karelTurnLeft = {
  "type": "karel_turn_left",
  "message0": "turn left",
  "previousStatement": null,
  "nextStatement": null,
}

Blockly.Blocks['karel_turn_left'] = {
  init: function() {
    this.jsonInit(karelTurnLeft);
    this.setStyle('loop_blocks');
  }
};

var karelPlaceStone = {
  "type": "karel_place_stone",
  "message0": "place stone",
  "previousStatement": null,
  "nextStatement": null,
}

Blockly.Blocks['karel_place_stone'] = {
  init: function() {
    this.jsonInit(karelPlaceStone);
    this.setStyle('loop_blocks');
  }
};

var karelPickupStone = {
  "type": "karel_pickup_stone",
  "message0": "pickup stone",
  "previousStatement": null,
  "nextStatement": null,
}

Blockly.Blocks['karel_pickup_stone'] = {
  init: function() {
    this.jsonInit(karelPickupStone);
    this.setStyle('loop_blocks');
  }
};
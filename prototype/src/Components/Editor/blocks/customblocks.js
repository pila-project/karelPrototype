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
import { bool } from 'prop-types';

// Style Blockly Main function definition to look like other function definitions
var karelMain = {
  "type": "karel_main",
  "message0": "define main %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "program"
    }
  ],
  "colour": 240,
  "tooltip": "Main function",
}

// Traditional Blockly style for Main function
// var karelMain = {
//   "type": "karel_main",
//   "message0": "main %1",
//   "args0": [
//     {
//       "type": "input_statement",
//       "name": "program"
//     }
//   ],
//   "colour": 240,
//   "tooltip": "Main function",
// }

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
    this.setStyle('procedure_blocks');
  }
};

// var karelCall = {
//   "type": "karel_call",
//   "message0": "%1",
//   "args0": [
//     {
//       "type": "field_label_serializable",
//       "name": "NAME"
//     },
//   ],
//   "previousStatement": null,
//   "nextStatement": null,
//   "colour": 45,
// }

// Blockly.Blocks['karel_call'] = {
//   init: function() {
//     this.jsonInit(karelCall);
//     this.setStyle('procedure_blocks');
//   },
// };

var karelTurnLeft = {
  "type": "karel_turn_left",
  "message0": "turn left",
  "previousStatement": null,
  "nextStatement": null,
}

Blockly.Blocks['karel_turn_left'] = {
  init: function() {
    this.jsonInit(karelTurnLeft);
    this.setStyle('procedure_blocks');
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
    this.setStyle('procedure_blocks');
  }
};

// var karelProcedure = {
//   "type": "karel_procedure",
//   "message0": "define %1 %2 %3",
//   "args0": [
//     {
//       "type": "field_input",
//       "name": "NAME",
//       "text": "my name"
//     },
//     {
//       "type": "input_dummy"
//     },
//     {
//       "type": "input_statement",
//       "name": "BODY"
//     }
//   ]
// }

// Blockly.Blocks['karel_procedure'] = {
//   init: function() {
//     this.jsonInit(karelProcedure);
//     this.setStyle('procedure_blocks');
//   }
// };

var karelPickupStone = {
  "type": "karel_pickup_stone",
  "message0": "pickup stone",
  "previousStatement": null,
  "nextStatement": null,
}

Blockly.Blocks['karel_pickup_stone'] = {
  init: function() {
    this.jsonInit(karelPickupStone);
    this.setStyle('procedure_blocks');
  }
};

var karelFrontIsClear = {
  "type": "karel_front_is_clear",
  "message0": "front is clear",
  "output": "Boolean",
  "colour": 45,
  "tooltip": "Check if there is an obstacle in front of Karel",
}

Blockly.Blocks['karel_front_is_clear'] = {
  init: function() {
    this.jsonInit(karelFrontIsClear);
  }
};

var karelStonesPresent = {
  "type": "karel_stones_present",
  "message0": "stones present",
  "output": "Boolean",
  "colour": 45,
  "tooltip": "Check if Karel is on top of any stones",
}

Blockly.Blocks['karel_stones_present'] = {
  init: function() {
    this.jsonInit(karelStonesPresent);
  }
};

var karelIfDropdown = {
  "type": "karel_if_dropdown",
  "message0": "if %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": [
        [
          "front is clear",
          "FRONT_CLEAR"
        ],
        [
          "front is blocked",
          "FRONT_BLOCKED"
        ],
        [
          "stones present",
          "STONE_PRESENT"
        ],
        [
          "stones absent",
          "STONE_ABSENT"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "THEN"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Check if Karel's path is blocked",
  "helpUrl": ""
}

Blockly.Blocks['karel_if_dropdown'] = {
  init: function() {
    this.jsonInit(karelIfDropdown);
    this.setStyle('logic_blocks');
  }
};

var karelIfFrontDropdown = {
  "type": "karel_if_front_dropdown",
  "message0": "if front is %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": [
        [
          "clear",
          "FRONT_CLEAR"
        ],
        [
          "blocked",
          "FRONT_BLOCKED"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "THEN"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Check if Karel's path is blocked",
  "helpUrl": ""
}

Blockly.Blocks['karel_if_front_dropdown'] = {
  init: function() {
    this.jsonInit(karelIfFrontDropdown);
    this.setStyle('logic_blocks');
  }
};

var karelIfStoneDropdown = {
  "type": "karel_if_stone_dropdown",
  "message0": "if stone is %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": [
        [
          "present",
          "STONE_PRESENT"
        ],
        [
          "not present",
          "STONE_ABSENT"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "THEN"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Check if Karel is on top of a stone",
  "helpUrl": ""
}

Blockly.Blocks['karel_if_stone_dropdown'] = {
  init: function() {
    this.jsonInit(karelIfStoneDropdown);
    this.setStyle('logic_blocks');
  }
};

var karelWhileFrontDropdown = {
  "type": "karel_while_front_dropdown",
  "message0": "while front is %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": [
        [
          "clear",
          "FRONT_CLEAR"
        ],
        [
          "blocked",
          "FRONT_BLOCKED"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "LOOP"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Repeat until condition is met",
  "helpUrl": ""
}

Blockly.Blocks['karel_while_front_dropdown'] = {
  init: function() {
    this.jsonInit(karelWhileFrontDropdown);
    this.setStyle('loop_blocks');
  }
};

var karelWhileDropdown = {
  "type": "karel_while_dropdown",
  "message0": "while %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": [
        [
          "front is clear",
          "FRONT_CLEAR"
        ],
        [
          "stones present",
          "STONE_PRESENT"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "LOOP"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Repeat until condition is met",
  "helpUrl": ""
}

Blockly.Blocks['karel_while_dropdown'] = {
  init: function() {
    this.jsonInit(karelWhileDropdown);
    this.setStyle('loop_blocks');
  }
};

var karelWhileStoneDropdown = {
  "type": "karel_while_stone_dropdown",
  "message0": "while stone is %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CONDITION",
      "options": [
        [
          "present",
          "STONE_PRESENT"
        ],
        [
          "not present",
          "STONE_ABSENT"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "LOOP"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "Loop until condition is met",
  "helpUrl": ""
}

Blockly.Blocks['karel_while_stone_dropdown'] = {
  init: function() {
    this.jsonInit(karelWhileStoneDropdown);
    this.setStyle('loop_blocks');
  }
};

// The code below creates two new blocks for defining and calling functions called `procedures_defnoargsnoreturn` and `procedures_callnoargsnoreturn`.
// These new blocks are based on the existing procedures_defnoreturn and procedures_callnoreturn blocks.
// The reason for creating these new blocks is to remove the ability to add arguments, simplifying usage and appearance.
// (Karel doesn't currently need the ability to define/call functions with arguments.)

// 1. Copy procedures_defnoreturn block

const procedures_defnoreturn_copy = Object.assign({}, Blockly.Blocks['procedures_defnoreturn']);


// 2. Monkeypatch init function of copied object to change the title of the block from 'to' to 'define' 
//    and remove the button that adds arguments.
//    See https://github.com/google/blockly/blob/master/blocks/procedures.js for the full definition.

procedures_defnoreturn_copy.init = function() {
  var nameField = new Blockly.FieldTextInput('my name',
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PROCEDURES_DEFNOARGSNORETURN_TITLE'])
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    // this.setMutator(new Blockly.Mutator(['procedures_mutatorarg'])); // Remove button that adds arguments to function definition
    if ((this.workspace.options.comments ||
         (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
    }
    this.setStyle('procedure_blocks');
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
}
procedures_defnoreturn_copy.callType_ = 'procedures_callnoargsnoreturn';


// 3. Define a new custom block for use in Blockly.

Blockly.Blocks['procedures_defnoargsnoreturn'] = procedures_defnoreturn_copy


// 4. Create matching call block for procedures_defnoargsnoreturn.

const procedures_callnoreturn_copy = Object.assign({}, Blockly.Blocks['procedures_callnoreturn']);
procedures_callnoreturn_copy.init = function() {
  this.appendDummyInput('TOPROW')
      .appendField(this.id, 'NAME');
  this.setPreviousStatement(true);
  this.setNextStatement(true);
  this.setStyle('procedure_blocks');
  // Tooltip is set in renameProcedure.
  this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
  this.arguments_ = [];
  this.argumentVarModels_ = [];
  this.quarkConnections_ = {};
  this.quarkIds_ = null;
  this.previousEnabledState_ = true;
}
procedures_callnoreturn_copy.defType_ = 'procedures_defnoargsnoreturn';
Blockly.Blocks['procedures_callnoargsnoreturn'] = procedures_callnoreturn_copy;
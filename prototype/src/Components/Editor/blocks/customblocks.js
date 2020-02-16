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

// Monkey patching init function for the procedures_defnoreturn block to
// change the title from 'to' to 'define' and to remove the button that
// adds arguments.
Blockly.Blocks['procedures_defnoreturn'].init = function() {
  var nameField = new Blockly.FieldTextInput('my name',
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        // .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'])
        .appendField("define") // Change function text to 'define' from 'to'. TODO: Update this in Blockly.Msg, not here.
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    // this.setMutator(new Blockly.Mutator(['procedures_mutatorarg'])); // Remove button to add arguments to function definition
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

// Blockly.Blocks['procedures_defnoreturn'] = {
//   /**
//    * Block for defining a procedure with no return value.
//    * @this {Blockly.Block}
//    */
//   init: function() {
//     var nameField = new Blockly.FieldTextInput('my name',
//         Blockly.Procedures.rename);
//     nameField.setSpellcheck(false);
//     this.appendDummyInput()
//         // .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'])
//         .appendField("define")
//         .appendField(nameField, 'NAME')
//         .appendField('', 'PARAMS');
//     // this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
//     if ((this.workspace.options.comments ||
//          (this.workspace.options.parentWorkspace &&
//           this.workspace.options.parentWorkspace.options.comments)) &&
//         Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
//       this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
//     }
//     this.setStyle('procedure_blocks');
//     this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
//     this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
//     this.arguments_ = [];
//     this.argumentVarModels_ = [];
//     this.setStatements_(true);
//     this.statementConnection_ = null;
//   },
//   /**
//    * Add or remove the statement block from this function definition.
//    * @param {boolean} hasStatements True if a statement block is needed.
//    * @this {Blockly.Block}
//    */
//   setStatements_: function(hasStatements) {
//     if (this.hasStatements_ === hasStatements) {
//       return;
//     }
//     if (hasStatements) {
//       this.appendStatementInput('STACK')
//           .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
//       if (this.getInput('RETURN')) {
//         this.moveInputBefore('STACK', 'RETURN');
//       }
//     } else {
//       this.removeInput('STACK', true);
//     }
//     this.hasStatements_ = hasStatements;
//   },
//   /**
//    * Update the display of parameters for this procedure definition block.
//    * @private
//    * @this {Blockly.Block}
//    */
//   updateParams_: function() {

//     // Merge the arguments into a human-readable list.
//     var paramString = '';
//     if (this.arguments_.length) {
//       paramString = Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] +
//           ' ' + this.arguments_.join(', ');
//     }
//     // The params field is deterministic based on the mutation,
//     // no need to fire a change event.
//     Blockly.Events.disable();
//     try {
//       this.setFieldValue(paramString, 'PARAMS');
//     } finally {
//       Blockly.Events.enable();
//     }
//   },
//   /**
//    * Create XML to represent the argument inputs.
//    * @param {boolean=} opt_paramIds If true include the IDs of the parameter
//    *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
//    * @return {!Element} XML storage element.
//    * @this {Blockly.Block}
//    */
//   mutationToDom: function(opt_paramIds) {
//     var container = Blockly.utils.xml.createElement('mutation');
//     if (opt_paramIds) {
//       container.setAttribute('name', this.getFieldValue('NAME'));
//     }
//     for (var i = 0; i < this.argumentVarModels_.length; i++) {
//       var parameter = Blockly.utils.xml.createElement('arg');
//       var argModel = this.argumentVarModels_[i];
//       parameter.setAttribute('name', argModel.name);
//       parameter.setAttribute('varid', argModel.getId());
//       if (opt_paramIds && this.paramIds_) {
//         parameter.setAttribute('paramId', this.paramIds_[i]);
//       }
//       container.appendChild(parameter);
//     }

//     // Save whether the statement input is visible.
//     if (!this.hasStatements_) {
//       container.setAttribute('statements', 'false');
//     }
//     return container;
//   },
//   /**
//    * Parse XML to restore the argument inputs.
//    * @param {!Element} xmlElement XML storage element.
//    * @this {Blockly.Block}
//    */
//   domToMutation: function(xmlElement) {
//     this.arguments_ = [];
//     this.argumentVarModels_ = [];
//     for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
//       if (childNode.nodeName.toLowerCase() == 'arg') {
//         var varName = childNode.getAttribute('name');
//         var varId = childNode.getAttribute('varid') || childNode.getAttribute('varId');
//         this.arguments_.push(varName);
//         var variable = Blockly.Variables.getOrCreateVariablePackage(
//             this.workspace, varId, varName, '');
//         if (variable != null) {
//           this.argumentVarModels_.push(variable);
//         } else {
//           console.log('Failed to create a variable with name ' + varName + ', ignoring.');
//         }
//       }
//     }
//     this.updateParams_();
//     Blockly.Procedures.mutateCallers(this);

//     // Show or hide the statement input.
//     this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
//   },
//   /**
//    * Populate the mutator's dialog with this block's components.
//    * @param {!Blockly.Workspace} workspace Mutator's workspace.
//    * @return {!Blockly.Block} Root block in mutator.
//    * @this {Blockly.Block}
//    */
//   decompose: function(workspace) {
//     /*
//      * Creates the following XML:
//      * <block type="procedures_mutatorcontainer">
//      *   <statement name="STACK">
//      *     <block type="procedures_mutatorarg">
//      *       <field name="NAME">arg1_name</field>
//      *       <next>etc...</next>
//      *     </block>
//      *   </statement>
//      * </block>
//      */

//     var containerBlockNode = Blockly.utils.xml.createElement('block');
//     containerBlockNode.setAttribute('type', 'procedures_mutatorcontainer');
//     var statementNode = Blockly.utils.xml.createElement('statement');
//     statementNode.setAttribute('name', 'STACK');
//     containerBlockNode.appendChild(statementNode);

//     var node = statementNode;
//     for (var i = 0; i < this.arguments_.length; i++) {
//       var argBlockNode = Blockly.utils.xml.createElement('block');
//       argBlockNode.setAttribute('type', 'procedures_mutatorarg');
//       var fieldNode = Blockly.utils.xml.createElement('field');
//       fieldNode.setAttribute('name', 'NAME');
//       var argumentName = Blockly.utils.xml.createTextNode(this.arguments_[i]);
//       fieldNode.appendChild(argumentName);
//       argBlockNode.appendChild(fieldNode);
//       var nextNode = Blockly.utils.xml.createElement('next');
//       argBlockNode.appendChild(nextNode);

//       node.appendChild(argBlockNode);
//       node = nextNode;
//     }

//     var containerBlock = Blockly.Xml.domToBlock(containerBlockNode, workspace);

//     if (this.type == 'procedures_defreturn') {
//       containerBlock.setFieldValue(this.hasStatements_, 'STATEMENTS');
//     } else {
//       containerBlock.removeInput('STATEMENT_INPUT');
//     }

//     // Initialize procedure's callers with blank IDs.
//     Blockly.Procedures.mutateCallers(this);
//     return containerBlock;
//   },
//   /**
//    * Reconfigure this block based on the mutator dialog's components.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this {Blockly.Block}
//    */
//   compose: function(containerBlock) {
//     // Parameter list.
//     this.arguments_ = [];
//     this.paramIds_ = [];
//     this.argumentVarModels_ = [];
//     var paramBlock = containerBlock.getInputTargetBlock('STACK');
//     while (paramBlock) {
//       var varName = paramBlock.getFieldValue('NAME');
//       this.arguments_.push(varName);
//       var variable = this.workspace.getVariable(varName, '');
//       this.argumentVarModels_.push(variable);

//       this.paramIds_.push(paramBlock.id);
//       paramBlock = paramBlock.nextConnection &&
//           paramBlock.nextConnection.targetBlock();
//     }
//     this.updateParams_();
//     Blockly.Procedures.mutateCallers(this);

//     // Show/hide the statement input.
//     var hasStatements = containerBlock.getFieldValue('STATEMENTS');
//     if (hasStatements !== null) {
//       hasStatements = hasStatements == 'TRUE';
//       if (this.hasStatements_ != hasStatements) {
//         if (hasStatements) {
//           this.setStatements_(true);
//           // Restore the stack, if one was saved.
//           Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
//           this.statementConnection_ = null;
//         } else {
//           // Save the stack, then disconnect it.
//           var stackConnection = this.getInput('STACK').connection;
//           this.statementConnection_ = stackConnection.targetConnection;
//           if (this.statementConnection_) {
//             var stackBlock = stackConnection.targetBlock();
//             stackBlock.unplug();
//             stackBlock.bumpNeighbours();
//           }
//           this.setStatements_(false);
//         }
//       }
//     }
//   },
//   /**
//    * Return the signature of this procedure definition.
//    * @return {!Array} Tuple containing three elements:
//    *     - the name of the defined procedure,
//    *     - a list of all its arguments,
//    *     - that it DOES NOT have a return value.
//    * @this {Blockly.Block}
//    */
//   getProcedureDef: function() {
//     return [this.getFieldValue('NAME'), this.arguments_, false];
//   },
//   /**
//    * Return all variables referenced by this block.
//    * @return {!Array.<string>} List of variable names.
//    * @this {Blockly.Block}
//    */
//   getVars: function() {
//     return this.arguments_;
//   },
//   /**
//    * Return all variables referenced by this block.
//    * @return {!Array.<!Blockly.VariableModel>} List of variable models.
//    * @this {Blockly.Block}
//    */
//   getVarModels: function() {
//     return this.argumentVarModels_;
//   },
//   /**
//    * Notification that a variable is renaming.
//    * If the ID matches one of this block's variables, rename it.
//    * @param {string} oldId ID of variable to rename.
//    * @param {string} newId ID of new variable.  May be the same as oldId, but
//    *     with an updated name.  Guaranteed to be the same type as the old
//    *     variable.
//    * @override
//    * @this {Blockly.Block}
//    */
//   renameVarById: function(oldId, newId) {
//     var oldVariable = this.workspace.getVariableById(oldId);
//     if (oldVariable.type != '') {
//       // Procedure arguments always have the empty type.
//       return;
//     }
//     var oldName = oldVariable.name;
//     var newVar = this.workspace.getVariableById(newId);

//     var change = false;
//     for (var i = 0; i < this.argumentVarModels_.length; i++) {
//       if (this.argumentVarModels_[i].getId() == oldId) {
//         this.arguments_[i] = newVar.name;
//         this.argumentVarModels_[i] = newVar;
//         change = true;
//       }
//     }
//     if (change) {
//       this.displayRenamedVar_(oldName, newVar.name);
//       Blockly.Procedures.mutateCallers(this);
//     }
//   },
//   /**
//    * Notification that a variable is renaming but keeping the same ID.  If the
//    * variable is in use on this block, rerender to show the new name.
//    * @param {!Blockly.VariableModel} variable The variable being renamed.
//    * @package
//    * @override
//    * @this {Blockly.Block}
//    */
//   updateVarName: function(variable) {
//     var newName = variable.name;
//     var change = false;
//     for (var i = 0; i < this.argumentVarModels_.length; i++) {
//       if (this.argumentVarModels_[i].getId() == variable.getId()) {
//         var oldName = this.arguments_[i];
//         this.arguments_[i] = newName;
//         change = true;
//       }
//     }
//     if (change) {
//       this.displayRenamedVar_(oldName, newName);
//       Blockly.Procedures.mutateCallers(this);
//     }
//   },
//   /**
//    * Update the display to reflect a newly renamed argument.
//    * @param {string} oldName The old display name of the argument.
//    * @param {string} newName The new display name of the argument.
//    * @private
//    * @this {Blockly.Block}
//    */
//   displayRenamedVar_: function(oldName, newName) {
//     this.updateParams_();
//     // Update the mutator's variables if the mutator is open.
//     if (this.mutator && this.mutator.isVisible()) {
//       var blocks = this.mutator.workspace_.getAllBlocks(false);
//       for (var i = 0, block; (block = blocks[i]); i++) {
//         if (block.type == 'procedures_mutatorarg' &&
//             Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
//           block.setFieldValue(newName, 'NAME');
//         }
//       }
//     }
//   },
//   /**
//    * Add custom menu options to this block's context menu.
//    * @param {!Array} options List of menu options to add to.
//    * @this {Blockly.Block}
//    */
//   customContextMenu: function(options) {
//     if (this.isInFlyout) {
//       return;
//     }
//     // Add option to create caller.
//     var option = {enabled: true};
//     var name = this.getFieldValue('NAME');
//     option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
//     var xmlMutation = Blockly.utils.xml.createElement('mutation');
//     xmlMutation.setAttribute('name', name);
//     for (var i = 0; i < this.arguments_.length; i++) {
//       var xmlArg = Blockly.utils.xml.createElement('arg');
//       xmlArg.setAttribute('name', this.arguments_[i]);
//       xmlMutation.appendChild(xmlArg);
//     }
//     var xmlBlock = Blockly.utils.xml.createElement('block');
//     xmlBlock.setAttribute('type', this.callType_);
//     xmlBlock.appendChild(xmlMutation);
//     option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
//     options.push(option);

//     // Add options to create getters for each parameter.
//     if (!this.isCollapsed()) {
//       for (var i = 0; i < this.argumentVarModels_.length; i++) {
//         var argOption = {enabled: true};
//         var argVar = this.argumentVarModels_[i];
//         argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET']
//             .replace('%1', argVar.name);

//         var argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
//         var argXmlBlock = Blockly.utils.xml.createElement('block');
//         argXmlBlock.setAttribute('type', 'variables_get');
//         argXmlBlock.appendChild(argXmlField);
//         argOption.callback =
//             Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
//         options.push(argOption);
//       }
//     }
//   },
//   callType_: 'procedures_callnoreturn'
// };
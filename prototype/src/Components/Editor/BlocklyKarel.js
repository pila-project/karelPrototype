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

 * https://github.com/google/blockly-samples/tree/master/blockly-react
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CodeWindow from './CodeWindow.js';

import Blockly from 'blockly/core';
import BlocklyComponent, { Category, Block, Value, Field, Shadow } from './Blockly';
import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './generator/generator';

class BlocklyKarel extends React.Component {

  constructor(props){
      super(props);
      this.state = {userCode: ''};
  }

  componentDidMount(){
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    this.simpleWorkspace.workspace.addChangeListener(this.generateCode);
    this.simpleWorkspace.workspace.addChangeListener(Blockly.Events.disableOrphans);
  }

  highlightBlock = (id) => {
    this.simpleWorkspace.workspace.highlightBlock(id);
  }

  getCode = () => {
    console.log(Blockly.Procedures.allProcedures(this.simpleWorkspace.workspace));
    console.log(Blockly.Procedures.flyoutCategory(this.simpleWorkspace.workspace));
    return this.state.userCode
  }

  generateCode = (event) => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    // code = code.substring(code.indexOf("\n") + 1) // Remove first highlightBlock call
    this.setState({userCode: code});
    // var id = code.split(';')[0].split(/'/)[1];
    // this.highlightBlock(id);
  }

  render() {
    return (
      <div className="verticalContainer">
        
        <div className="horizontalContainer">
            <BlocklyComponent 
              ref={e => this.simpleWorkspace = e} 
              style={{height:'100%'}}
              readOnly={false}
              //theme={Blockly.Themes.Modern}
              move={{
                scrollbars: true,
                drag: true,
                wheel: true
              }} 
              initialXml={`
  <xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="karel_main" deletable="false" x="180" y="50"></block>
  </xml>
        `}>
                  {/* <Block type="karel_main" /> */}
                  <category name="Karel">
                    <Block type="karel_move" />
                    <Block type="karel_turn_left" />
                    <Block type="karel_place_stone" />
                    <Block type="karel_pickup_stone" />
                    <Block type="karel_if_front_dropdown" />
                    <Block type="karel_if_stone_dropdown" />
                    {/* <Block type="controls_if" /> */}
                    <Block type="karel_while_front_dropdown" />
                    <Block type="karel_while_stone_dropdown" />
                    {/* <Block type="controls_whileUntil" /> */}
                    <Block type="controls_repeat_ext">
                    <Value name="TIMES">
                        <Shadow type="math_number">
                        <Field name="NUM">10</Field>
                        </Shadow>
                    </Value>
                    </Block>
                  </category>
                  <category name="Functions" custom="PROCEDURE"></category>
                  {/* <Block type="procedures_defnoreturn" /> */}
                  {/* <Block type="procedures_callnoreturn" /> */}
            </BlocklyComponent>
          </div>
        {/* </header> */}
      </div>
    );
  }
}

export default BlocklyKarel;

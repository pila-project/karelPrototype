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
    this.simpleWorkspace.workspace.addChangeListener(this.generateCode);
  }

  getCode() {
    return this.state.userCode
  }

  generateCode = (event) => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    this.setState({userCode: code});
  }

  render() {
    return (
      <div className="verticalContainer">
        
        <div className="horizontalContainer">
            <BlocklyComponent 
              ref={e => this.simpleWorkspace = e} 
              style={{height:'100%'}}
              readOnly={false} 
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
                  <Block type="karel_move" />
                  <Block type="karel_turn_left" />
                  <Block type="karel_place_stone" />
                  <Block type="karel_pickup_stone" />
                  <Block type="controls_ifelse" />
                  <Block type="controls_repeat_ext">
                  <Value name="TIMES">
                      <Shadow type="math_number">
                      <Field name="NUM">10</Field>
                      </Shadow>
                  </Value>
                  </Block>
            </BlocklyComponent>
          </div>
        {/* </header> */}
      </div>
    );
  }
}

export default BlocklyKarel;

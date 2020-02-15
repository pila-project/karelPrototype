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
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CodeWindow from './BlocklyDemo/CodeWindow.js';
import logo from './BlocklyDemo/logo.svg';

import Blockly from 'blockly/core';
import BlocklyComponent, { Category, Block, Value, Field, Shadow } from './BlocklyDemo/Blockly';
import BlocklyJS from 'blockly/javascript';

import './BlocklyDemo/blocks/customblocks';
import './BlocklyDemo/generator/generator';

class BlocklyDemo extends React.Component {

  constructor(props){
      super(props);
      this.state = {userCode: ''};
  }

  componentDidMount(){
    this.simpleWorkspace.workspace.addChangeListener(this.generateCode);
  }

  generateCode = (event) => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    this.setState({userCode: code});
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <CodeWindow userCode={this.state.userCode} />
            {/* <header className="App-header"> */}
            {/* <button onClick={this.generateCode}>Convert</button> */}
          </Col>
          <Col>
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
        </Row>
        <Row>
            <BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} move={{
              scrollbars: true,
              drag: true,
              wheel: true
            }} initialXml={`
  <xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="karel_main" deletable="false" x="250" y="50"></block>
  </xml>
        `}>
              <Category name="Karel" colour="120">
                  {/* <Block type="karel_main" /> */}
                  <Block type="karel_move" />
                  <Block type="karel_turn_left" />
                  <Block type="karel_place_stone" />
                  <Block type="karel_pickup_stone" />
              </Category>

              <Category name="Control Flow" colour="230">
                  <Block type="controls_ifelse" />
                  <Block type="logic_compare" />
                  <Block type="logic_operation" />
                  <Block type="controls_repeat_ext">
                  <Value name="TIMES">
                      <Shadow type="math_number">
                      <Field name="NUM">10</Field>
                      </Shadow>
                  </Value>
                  </Block>
              </Category>>

              <Category name="Misc" colour="000">
                  <Block type="test_react_field" />
                  <Block type="test_react_date_field" />
                  <Block type="logic_operation" />
                  <Block type="logic_negate" />
                  <Block type="logic_boolean" />
                  <Block type="logic_null" disabled="true" />
                  <Block type="logic_ternary" />
                  <Block type="text_charAt">
                  <Value name="VALUE">
                      <Block type="variables_get">
                      <Field name="VAR">text</Field>
                      </Block>
                  </Value>
                  </Block>
            </Category>
	    <Category name="Functions" colour="290" custom="PROCEDURE"></Category>
            </BlocklyComponent>
          </Row>
        {/* </header> */}
      </Container>
    );
  }
}

export default BlocklyDemo;

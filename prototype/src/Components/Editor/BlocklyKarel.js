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
      this.state = {
        userCode: '',
        userFunctionBlocks: {}
      };
  }

  componentDidMount(){
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    this.simpleWorkspace.workspace.addChangeListener(this.generateCode);
    this.simpleWorkspace.workspace.addChangeListener(Blockly.Events.disableOrphans);
    this.simpleWorkspace.workspace.addChangeListener(this.updateFunctions);
  }

  highlightBlock = (id) => {
    this.simpleWorkspace.workspace.highlightBlock(id);
  }

  getCode = () => {
    return this.state.userCode
  }

  generateCode = (event) => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    this.setState({userCode: code});
  }

  updateFunctions = (event) => {
    if (event.type == Blockly.Events.CREATE || event.type == Blockly.Events.DELETE || (event.type == Blockly.Events.CHANGE && event.element == 'field')){
      const allProcedures = Blockly.Procedures.allProcedures(this.simpleWorkspace.workspace);
      const flyoutCategory = Blockly.Procedures.flyoutCategory(this.simpleWorkspace.workspace);

      const uFuncBlocks = {}
      for (const proc of allProcedures[0]) {
        uFuncBlocks[proc[0]] = Blockly.Procedures.getDefinition(proc[0], this.simpleWorkspace.workspace);
      }
      this.setState({userFunctionBlocks:uFuncBlocks});

      // This is a hack, but I can't figure out how to get the toolbox view to re-render otherwise.
      this.simpleWorkspace.workspace.updateToolbox(this.simpleWorkspace.toolbox.outerHTML);
    }
  }

  render() {
    return (
      <div className="verticalContainer fullSize">
        
        <div className="horizontalContainer fullSize">
            <BlocklyComponent 
              ref={e => this.simpleWorkspace = e} 
              //horizontalLayout={true}
              //toolboxPosition='end'
              style={{height:'100%'}}
              readOnly={false}
              //theme={Blockly.Themes.Modern}
              move={{
                scrollbars: true,
                drag: false,
                wheel: true
              }} 
              initialXml={`
                <xml xmlns="http://www.w3.org/1999/xhtml">
                <block type="karel_main" deletable="false" movable="false" x="50" y="30"></block>
                </xml>
        `      }>
              <ToolboxXML userFunctionBlocks={this.state.userFunctionBlocks} categories={false}/>
              {/* <category name="Functions" custom="PROCEDURE"></category> */}
            </BlocklyComponent>
          </div>
        {/* </header> */}
      </div>
    );
  }
}

class ToolboxXML extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    if (this.props.categories == false)
    {
      return (
        <React.Fragment>
          <Block type="karel_move" />
          <Block type="karel_turn_left" />
          <Block type="karel_place_stone" />
          <Block type="karel_pickup_stone" />
          <Block type="karel_if_front_dropdown" />
          <Block type="karel_if_stone_dropdown" />
          <Block type="karel_while_front_dropdown" />
          <Block type="karel_while_stone_dropdown" />
          <Block type="controls_repeat_ext">
          <Value name="TIMES">
              <Shadow type="math_number">
              <Field name="NUM">10</Field>
              </Shadow>
          </Value>
          </Block>
          <Block type="procedures_defnoreturn" />
          <React.Fragment>
          {Object.entries(this.props.userFunctionBlocks).map(([blockName, block]) =>
            <React.Fragment key={block.id}>
              <Block type="procedures_callnoreturn" children={<mutation name={blockName}/>}/>
            </React.Fragment>
          )}
          </React.Fragment>
        </React.Fragment>
      );
    }
    return(
      <React.Fragment>
        <category name="Karel">
        <Block type="karel_move" />
        <Block type="karel_turn_left" />
        <Block type="karel_place_stone" />
        <Block type="karel_pickup_stone" />
        <Block type="karel_if_front_dropdown" />
        <Block type="karel_if_stone_dropdown" />
        <Block type="karel_while_front_dropdown" />
        <Block type="karel_while_stone_dropdown" />
        <Block type="controls_repeat_ext">
        <Value name="TIMES">
            <Shadow type="math_number">
            <Field name="NUM">10</Field>
            </Shadow>
        </Value>
        </Block>
        </category>
        <category name="Functions" custom="PROCEDURE"></category>
      </React.Fragment>
    );
  }
}

export default BlocklyKarel;

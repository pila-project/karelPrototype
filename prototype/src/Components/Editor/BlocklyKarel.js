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

const OFFSET = 20

const defaultXml = `<xml xmlns="http://www.w3.org/1999/xhtml">
                    <block type="karel_main" deletable="false" movable="false" x="${OFFSET}" y="${OFFSET}"></block>
                  </xml>`

class BlocklyKarel extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        userCode: '',
        userFunctionBlocks: {},
        initialXml: this.getInitialXml()
      };
  }

  static defaultProps = {
    initialXml: defaultXml,
    isEditable: true,
    hideBlocks: {}
  }

  componentWillMount() {}

  componentDidMount(){
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    Blockly.JavaScript.addReservedWords('run');
    this.simpleWorkspace.workspace.addChangeListener(this.generateCode);
    this.simpleWorkspace.workspace.addChangeListener(Blockly.Events.disableOrphans);
    this.simpleWorkspace.workspace.addChangeListener(this.updateFunctions);
    this.simpleWorkspace.workspace.addChangeListener(this.onCodeChange);
  }

  highlightBlock = (id) => {
    this.simpleWorkspace.workspace.highlightBlock(id);
  }

  getCode = () => {
    return this.state.userCode
  }

  getInitialXml() {
    let initialXml = this.props.initialXml;
    if(this.props.savedXml != undefined) { // TODO: Make sure this check is necessary
      initialXml = this.props.savedXml;
    }
    return initialXml;
  }

  generateCode = (event) => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    this.setState({userCode: code});
  }

  isFunction(block){
    if(block.type == 'procedures_defnoargsnoreturn') {
      return true
    }
    if(block.type == 'karel_main') {
      return true
    }
    return false
  }

  getAllFunctions() {
    // Find top-level blocks and return them by position, sorted top to bottom
    let topBlocks = this.simpleWorkspace.workspace.getTopBlocks(true)
    let functions = []
    for (var i = 0; i < topBlocks.length; i++) {
      let block = topBlocks[i]
      if(this.isFunction(block)) {
        functions.push(block)
      }
    }
    return functions
  }

  autoPositionBlocks() {
    let goalX = OFFSET
    var goalY = OFFSET
    // only auto indent functions
    let functions = this.getAllFunctions()
    for (var i = 0; i < functions.length; i++) {
      let block = functions[i]
      let xy = block.getRelativeToSurfaceXY()
      // delta = goal - curr
      block.moveBy(goalX - xy['x'], goalY - xy['y'])
      goalY += block.height + OFFSET
    }
  }

  populateFunctionList() {
    const allProcedures = Blockly.Procedures.allProcedures(this.simpleWorkspace.workspace);
    const uFuncBlocks = {}
    for (const proc of allProcedures[0]) {
      let name = proc[0];
      uFuncBlocks[name] = Blockly.Procedures.getDefinition(name, this.simpleWorkspace.workspace);
    }
    this.setState({userFunctionBlocks:uFuncBlocks});
    // This is a bit of a hack, but I can't figure out how to get the toolbox view to re-render otherwise.

    this.simpleWorkspace.workspace.updateToolbox(this.simpleWorkspace.toolbox.outerHTML);
  }

  updateFunctions = (event) => {
    if(event.type == Blockly.Events.MOVE || event.type == Blockly.Events.DELETE) {
      this.autoPositionBlocks()
    }
    if (event.type == Blockly.Events.CREATE || event.type == Blockly.Events.DELETE || (event.type == Blockly.Events.CHANGE && event.element == 'field')){
      this.populateFunctionList()
    }
  }

  onCodeChange = (event) => {
    let newCode = Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace, true).outerHTML
    if(this.props.onCodeChange){
      this.props.onCodeChange(newCode);
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
              initialXml={this.state.initialXml}>

              <ToolboxXML
                userFunctionBlocks={this.state.userFunctionBlocks}
                hideBlocks = {this.props.hideBlocks}
              />
            </BlocklyComponent>
          </div>
      </div>
    );
  }
}

class ToolboxXML extends React.Component {
  constructor(props){
    super(props);
  }

  getBlockComponent(blockType) {
    // The loop block is a bit complex
    if(blockType === 'controls_repeat_ext') {
      return (
        <Block type="controls_repeat_ext">
          <Value name="TIMES">
              <Shadow type="math_number">
              <Field name="NUM">10</Field>
              </Shadow>
          </Value>
        </Block>
      )
    }
    if(blockType === 'karel_procedure') {
      return <Block type="procedures_defnoargsnoreturn" />
    }

    // But most blocks are straightforward
    return <Block type={blockType} />
  }

  addBlock(blockType) {
    if(blockType in this.props.hideBlocks) {
      return <span />
    } else {
      return this.getBlockComponent(blockType)
    }
  }

  addUserBlocks() {
    return (
    <React.Fragment>
      {Object.entries(this.props.userFunctionBlocks).map(([blockName, block]) =>
      <React.Fragment key={block.id}>
        <Block type="procedures_callnoargsnoreturn" children={<mutation name={blockName}/>}/>
      </React.Fragment>
      )}
    </React.Fragment>
    )
  }

  render() {

    return (
      <React.Fragment>
        {this.addBlock('karel_procedure')}
        {this.addBlock('karel_move')}
        {this.addBlock('karel_turn_left')}
        {this.addBlock('karel_place_stone')}
        {this.addBlock('karel_pickup_stone')}
        {this.addUserBlocks()}
        {this.addBlock('karel_while_dropdown')}
        {this.addBlock('controls_repeat_ext')}
      </React.Fragment>
    );
  }
}

export default BlocklyKarel

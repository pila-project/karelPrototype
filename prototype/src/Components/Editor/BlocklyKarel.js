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
import { connect } from 'react-redux';
import { updateStatus, updateCode } from 'redux/actions';
import { selectCodeByCurrentId } from 'redux/selectors';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CodeWindow from './CodeWindow.js';

import Blockly from 'blockly/core';
import BlocklyComponent, { Category, Block, Value, Field, Shadow } from './Blockly';
import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './generator/generator';

const mapStateToProps = (state, ownProps) => {
  const savedXml = selectCodeByCurrentId(state);
  return { savedXml };
}

const mapDispatchToProps = {
  // onUpdateStatus: (status) => updateStatus(status),
  onUpdateCode: (code) => updateCode(code)
};

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

  componentDidMount(){
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    this.simpleWorkspace.workspace.addChangeListener(this.generateCode);
    this.simpleWorkspace.workspace.addChangeListener(Blockly.Events.disableOrphans);
    // this.simpleWorkspace.workspace.addChangeListener(Blockly.Events.BlockCreate);
    this.simpleWorkspace.workspace.addChangeListener(this.updateFunctions);
    this.simpleWorkspace.workspace.addChangeListener(this.storeCode);
  }

  highlightBlock = (id) => {
    this.simpleWorkspace.workspace.highlightBlock(id);
  }

  getCode = () => {
    return this.state.userCode
  }

  getInitialXml() {
    // TODO: Determine if savedXml should overwrite initialXml, 
    // or if there is a better way of handling this.
    let initialXml = this.props.initialXml;
    if(this.props.savedXml != undefined) {
      initialXml = this.props.savedXml;
    }
    return initialXml;
  }

  generateCode = (event) => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    this.setState({userCode: code});
  }

  isFunction(block){
    if(block.type == 'procedures_defnoreturn') {
      return true
    }
    if(block.type == 'karel_main') {
      return true
    }
    if(block.type == 'karel_procedure') {
      return true
    }
    return false
  }

  getAllFunctions() {
    let topBlocks = this.simpleWorkspace.workspace.getTopBlocks()
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
    const functions = this.getAllFunctions()
    const uFuncBlocks = {}
    for(const block of functions) {
      if(block.type == 'karel_main') continue
      let name = block.inputList[0]['fieldRow'][1].getValue()
      uFuncBlocks[name] = block
    }
    this.setState({userFunctionBlocks:uFuncBlocks});

    // const allProcedures = Blockly.Procedures.allProcedures(this.simpleWorkspace.workspace);
    //   const flyoutCategory = Blockly.Procedures.flyoutCategory(this.simpleWorkspace.workspace);

    //   const uFuncBlocks = {}
    //   for (const proc of allProcedures[0]) {
    //     uFuncBlocks[proc[0]] = Blockly.Procedures.getDefinition(proc[0], this.simpleWorkspace.workspace);
    //   }
    //   this.setState({userFunctionBlocks:uFuncBlocks});

      // This is a hack, but I can't figure out how to get the toolbox view to re-render otherwise.
      this.simpleWorkspace.workspace.updateToolbox(this.simpleWorkspace.toolbox.outerHTML);
  }

  updateFunctions = (event) => {
    if(event.type == 'create') {
    }

    if(event.type == Blockly.Events.MOVE) {
      this.autoPositionBlocks()
    }
    
    if (event.type == Blockly.Events.CREATE || event.type == Blockly.Events.DELETE || (event.type == Blockly.Events.CHANGE && event.element == 'field')){
      this.populateFunctionList()
      let code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    }
  }

  storeCode = (event) => {
    this.props.onUpdateCode(Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace, true).outerHTML);
    // if(event.type == Blockly.Events.CHANGE || event.type == Blockly.Events.CREATE || event.type == Blockly.Events.DELETE){
    //   this.props.onUpdateCode(Blockly.Xml.workspaceToDom(this.simpleWorkspace.workspace, true).outerHTML);
    // }
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

  getBlockComponent(blockType) {
    // the loop is a bit complex
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

    // most blocks are straightforward
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
    // add the blocks for all the user defined methods
    return (
      <React.Fragment>
        {Object.entries(this.props.userFunctionBlocks).map(([blockName, block]) =>
          <React.Fragment key={block.id}>
            <Block key={block.id} type="karel_call" children={<mutation name={blockName}/>}>
              <Field EDITABLE={false} key={blockName} name="NAME">{blockName}</Field>
            </Block>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlocklyKarel)

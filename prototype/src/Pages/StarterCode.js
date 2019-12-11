import React, { Component } from 'react'

import Blockly from 'blockly/core';
import BlocklyKarel from '../Components/Editor/BlocklyKarel.js'
import CodeWindow from '../Components/Editor/CodeWindow.js'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class StarterCode extends Component {

  constructor(props){
    super(props);
    this.state = {xml:''};
  }

  componentWillMount() {
    document.title = "Starter Code Generator";
  }

  generateMutableXML() {
    for(const block of this.refs.editor.simpleWorkspace.workspace.getAllBlocks()){
      if(block.type == 'karel_main'){
        continue;
      }
      block.setEditable(true);
      block.setMovable(true);
      block.setDeletable(true);
    }
    this.generateXML();
  }

  generateImmutableXML() {
    for(const block of this.refs.editor.simpleWorkspace.workspace.getAllBlocks()){
      block.setEditable(false);
      block.setMovable(false);
      block.setDeletable(false);
    }
    this.generateXML();
  }

  generateXML(){
    this.setState({xml:Blockly.Xml.workspaceToDom(this.refs.editor.simpleWorkspace.workspace, true).outerHTML});
  }

  CopyXMLToClipboard() {
    // https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = this.state.xml;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
 
  render() {
    return (

      <div className="horizontal" >
        <div style={{width:800, height:560, marginRight:40}}>
          <BlocklyKarel 
            ref="editor"
          />
          <Button style={{height:40, margin:20}} size="md" onClick = {() => this.generateMutableXML()}>Generate Mutable XML</Button>
          <Button style={{height:40, margin:20}} size="md" onClick = {() => this.generateImmutableXML()}>Generate Immutable XML</Button>
        </div>
        <div style={{position:"relative", width:500}}>
          <CodeWindow userCode={this.state.xml}/>
        </div>
      </div>

    )
  }
}

export default StarterCode
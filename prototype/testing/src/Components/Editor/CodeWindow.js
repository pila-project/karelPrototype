import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class CodeWindow extends Component {
    constructor(props){
        super(props);
    }

    copyContentsToClipboard = () => {
        let ta = document.getElementById('code-textarea');
        ta.select();
        document.execCommand('copy');
    }

    render(){
        return(
            <div id="code-window">
                <textarea style={{width:500, height:560}} id="code-textarea" value={this.props.userCode} />
                <Button style={{height:40}} size="md" onClick = {() => this.copyContentsToClipboard()}>Copy to Clipboard</Button>
            </div>
        )
    }
}

export default CodeWindow

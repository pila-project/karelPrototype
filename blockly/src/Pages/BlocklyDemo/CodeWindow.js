import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class CodeWindow extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="code-window">
                <pre>{this.props.userCode}</pre>
            </div>
        )
    }
}

export default CodeWindow

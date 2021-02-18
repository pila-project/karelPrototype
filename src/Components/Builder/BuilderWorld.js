import React, { Component } from 'react';
import './style/builder.css'
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import BuilderEast from './images/builderEast.png'
import BuilderWest from './images/builderWest.png'
import Beeper from './images/beeper.png'

/**
 Props:
 nRows
 nCols
 */
const BUILDER_IMG_PCT = 0.9
const BRICK_PCT = 0.95
const CROSS_PCT = 0.1

class BuilderWorld extends Component {


  componentWillMount() {

    var builderRow = this.props.nRows - 1
    if('builderRow' in this.props){
      builderRow = this.props.builderRow
    }

    var builderCol = 0
    if('builderCol' in this.props) {
      builderCol = this.props.builderCol
    }

    var karelDir = 'East'
    if('karelDir' in this.props) {
      karelDir = this.props.karelDir
    }

    this.setState({
      builderRow:builderRow,
      builderCol:builderCol,
      dir:karelDir,
      bricks:this.initBricks()
    })
  }

  reset(callbackFn) {
    this.setState({
      builderRow:this.props.nRows - 1,
      builderCol:0,
      dir:'East',
      bricks:this.initBricks()
    }, callbackFn)
  }

  initBricks() {
    var bricks = []
    // make a grid of zeros
    for(var r = 0; r < this.props.nRows; r++) {
      var row = []
      for(var c = 0; c < this.props.nCols; c++) {
        row.push(0)
      }
      bricks.push(row)
    }
    // look for initialized bricks
    if('bricks' in this.props) {
      for (var i = 0; i < this.props.bricks.length; i++) {
        var stone = this.props.bricks[i]
        bricks[stone.r][stone.c] = stone.n
      }
    }
    return bricks
  }

  setStepCallback(callbackFn) {
    this.onStepFinished = callbackFn
  }

 /***********************************************
  *     Commands                                *
  ***********************************************/

  move() {
    let oldRow = this.state.builderRow;
    let oldCol = this.state.builderCol;
    var newRow = oldRow;
    var newCol = oldCol;
    switch(this.state.dir) {
      case 'East': newCol++; break;
      case 'West': newCol--; break;
      case 'North': newRow = newRow - 1; break;
      case 'South': newRow = newRow + 1; break;
      default: console.console.error("invalid this.dir: " + this.dir); break;
    }
    if(this.isMoveValid(oldRow, oldCol, newRow, newCol)) {
      this.setState({
        builderRow:newRow,
        builderCol:newCol
      }, this.onStepFinished)
    } else {
      this.error('Front Is Blocked');
    }
  }

  placeBrick() {
    let row = this.state.builderRow;
    let col = this.state.builderCol
    // if you are facing east, brick is one to left
    if(this.state.dir == 'West') {
      col--
    }
    this.setState(state => {
      const bricks = state.bricks
      bricks[row][col]++
      return {
        bricks
      };
    }, this.onStepFinished);
  }

  moveUp() {
    let oldRow = this.state.builderRow;
    let oldCol = this.state.builderCol;
    var newRow = oldRow - 1;
    var newCol = oldCol;
    if(this.isMoveValid(oldRow, oldCol, newRow, newCol)) {
      this.setState({
        builderRow:newRow,
      }, this.onStepFinished)
    } else {
      this.error('Up is not possible');
    }
  }

  moveDown() {
    let oldRow = this.state.builderRow;
    let oldCol = this.state.builderCol;
    var newRow = oldRow + 1;
    var newCol = oldCol;
    if(this.isMoveValid(oldRow, oldCol, newRow, newCol)) {
      this.setState({
        builderRow:newRow,
      }, this.onStepFinished)
    } else {
      this.error('Down is not possible');
    }
  }

  turn() {
    var newDir = this.state.dir
    switch(this.state.dir) {
      case 'East': newDir = 'West'; break;
      case 'West': newDir = 'East'; break;
    }
    this.setState({
      dir:newDir,
    }, this.onStepFinished)
  }

  frontIsClear() {
    let oldRow = this.state.builderRow;
    let oldCol = this.state.builderCol;
    var newRow = oldRow;
    var newCol = oldCol;
    switch(this.state.dir) {
      case 'East': newCol++; break;
      case 'West': newCol--; break;
      case 'North': newRow = newRow - 1; break;
      case 'South': newRow = newRow + 1; break;
      default: console.console.error("invalid this.dir: " + this.dir); break;
    }
    return this.isMoveValid(oldRow, oldCol, newRow, newCol)
  }

  frontIsBlocked() {
    return !(this.frontIsClear())
  }

  bricksPresent() {
    let r = this.state.builderRow
    let c = this.state.builderCol
    return this.state.bricks[r][c] > 0
  }

 /***********************************************
  *     Model                                   *
  ***********************************************/

  isMoveValid(startR, startC, endR, endC) {
    if(endC < 0 || endC >= this.props.nCols) return false;
    if(endR < 0 || endR >= this.props.nRows) return false;

    var dRow = Math.abs(endR - startR);
    var dCol = Math.abs(endC - startC);
    if (dRow + dCol != 1) return false;

    // TODO: look for walls
    // if(startC + 1 == endC && that.rightWalls[startR][startC]) return false;
    // if(startC - 1 == endC && that.rightWalls[endR][endC]) return false;

    // if(startR + 1 == endR && that.topWalls[endR][endC]) return false;
    // if(startR - 1 == endR && that.topWalls[startR][endC]) return false;

    return true
  }

 /***********************************************
  *     Render                                *
  ***********************************************/

  error(message) {
    Swal.fire({
      title: message,
      icon: 'error',
      toast:true,
      allowOutsideClick:true
    })
  }

  getCornerSize() {
    let colSize = this.props.width / this.props.nCols
    let rowSize = this.props.height / this.props.nRows
    return Math.min(colSize, rowSize)
  }

  getWorldLeft() {
    return 0
  }

  getWorldTop() {
    return 0
  }

  getCornerX(row, col) {
    return this.getWorldLeft() + col * this.getCornerSize();
  }

  getCornerY(row, col) {
    return this.getWorldTop() + row * this.getCornerSize();
  }

  getBuilderImg() {
    switch(this.state.dir) {
      case 'East': return BuilderEast
      case 'West': return BuilderWest
      default: return BuilderEast
    }
  }

  renderInnerWalls() {
    var walls = []
    if(!('walls' in this.props)) return <div />
    for (var i = 0; i < this.props.walls.length; i++) {
      let wall = this.props.walls[i]
      let x = this.getCornerX(wall.r, wall.c)
      let y = this.getCornerY(wall.r, wall.c)
      if(wall.d == 'North') {
        walls.push(<div
          className="wall"
          style={{
            marginLeft:x,
            marginTop:y,
            width:this.getCornerSize(),
            height:2,
          }}
          key={i}
        ></div>)
      } else if(wall.d == 'East') {

      } else {
        console.error('Walls must be North or East')
      }
    }
    console.log('walls', walls)
    return (<div>{walls}</div>)
  }

  renderGrid() {
    var lines = []
    for (var r = 0; r < this.props.nRows; r++) {
      for(var c = 0; c < this.props.nCols; c++) {
        let cornerSize = this.getCornerSize()
        let x = this.getCornerX(r, c) + 0.5 * cornerSize
        let y = this.getCornerY(r, c) + 0.5 * cornerSize
        let crossSize = cornerSize * CROSS_PCT
        lines.push(<div
          className="cross"
          style={{
            marginLeft:x - crossSize/2,
            marginTop:y-1,
            width:crossSize,
            height:2
          }}
          key={r+','+c +'1'}
        ></div>)
        lines.push(<div
          className="cross"
          style={{
            marginLeft:x-1,
            marginTop:y - crossSize/2,
            width:2,
            height:crossSize
          }}
          key={r+','+c +'2'}
        ></div>)
      }
    }

    return (<div>{lines}</div>)
  }

  renderBricks() {
    console.log(this.state.bricks)
    var bricks = []
    for (var r = 0; r < this.props.nRows; r++) {
      for(var c = 0; c < this.props.nCols; c++) {
        let hasBricks = this.state.bricks[r][c] > 0
        if(hasBricks) {
          let cornerSize = this.getCornerSize()
          let width = 2.0 * cornerSize * BRICK_PCT
          let height = cornerSize * BRICK_PCT
          let marginWidth = 2.0 * cornerSize - width
          let marginHeight = cornerSize - height
          let x = this.getCornerX(r, c) + marginWidth/2.0
          let y = this.getCornerY(r, c) + marginHeight/2.0
          bricks.push(<div
            className="brick"
            style={{
              marginLeft:x,
              marginTop:y,
              width:width,
              height:height
            }}
            key={r+','+c}
          ></div>)
        }
      }
    }
    return <div>{bricks}</div>
  }

  renderBuilder() {
    let row = this.state.builderRow
    let col = this.state.builderCol
    let cornerSize = this.getCornerSize()
    let size = BUILDER_IMG_PCT * this.getCornerSize()
    let offset = (cornerSize - size)/2
    let x = this.getCornerX(row, col) + offset
    let y = this.getCornerY(row, col) + offset
    return (<img
      className="builder"
      style={{marginLeft:x,marginTop:y}}
      width={size}
      height={size}
      src={this.getBuilderImg()}>
    </img>)
  }

  render() {
    return (
      <div
        className= "ideCanvas"
        style={{
          width:this.props.width,
          height:this.props.height
        }}
      >
        {this.renderInnerWalls()}
        {this.renderGrid()}
        {this.renderBricks()}
        {this.renderBuilder()}
      </div>
    )
  }
}

export default BuilderWorld

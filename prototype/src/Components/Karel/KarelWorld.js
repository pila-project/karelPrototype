import React, { Component } from 'react';
import './style/karel.css'
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import KarelNorth from './images/karelNorth.png'
import KarelSouth from './images/karelSouth.png'
import KarelEast from './images/karelEast.png'
import KarelWest from './images/karelWest.png'
import Beeper from './images/beeper.png'

const KAREL_IMG_PCT = 0.8
const BEEPER_IMG_PCT = 0.5
const CROSS_PCT = 0.1

class KarelWorld extends Component {

  static stateEquals(a, b) {
    if(a.karelRow != b.karelRow) return false
    if(a.karelCol != b.karelCol) return false
    if(a.dir != b.dir) return false

    // check stones
    let nRowsA = a.stones.length
    let nColsA = a.stones[0].length    
    let nRowsB = b.stones.length
    let nColsB = b.stones[0].length 
    if(nRowsA != nRowsB) return false
    if(nColsA != nColsB) return false 
    for (var r = 0; r < nRowsA; r++) {
      for (var c = 0; c < nColsA; c++) {
        if(a.stones[r][c] != b.stones[r][c]) {
          return false
        }
      }
    }

    // WARNING: doesn't check walls

    return true
  }

  componentWillMount() {
    this.setStateToProps(console.log)
  }

  setStateToProps(callbackFn) {
    var karelRow = this.props.nRows - 1
    if('karelRow' in this.props){
      karelRow = this.props.karelRow
    }

    var karelCol = 0
    if('karelCol' in this.props) {
      karelCol = this.props.karelCol
    }

    var karelDir = 'East'
    if('karelDir' in this.props) {
      karelDir = this.props.karelDir
    }

    this.setState({
      karelRow:karelRow,
      karelCol:karelCol,
      dir:karelDir,
      stones:this.initStones(),
    },callbackFn)
  }

  getWorldState() {
    return this.state
  }

  reset(callbackFn) {
    this.setStateToProps(callbackFn)
  }

  initStones() {
    var stones = []
    // make a grid of zeros
    for(var r = 0; r < this.props.nRows; r++) {
      var row = []
      for(var c = 0; c < this.props.nCols; c++) {
        row.push(0)
      }
      stones.push(row)
    }
    // look for initialized stones
    if('stones' in this.props) {
      for (var i = 0; i < this.props.stones.length; i++) {
        var stone = this.props.stones[i]
        stones[stone.r][stone.c] = stone.n
      }
    } 
    return stones
  }

  setStepCallback(callbackFn) {
    this.onStepFinished = callbackFn
  }

 /***********************************************
  *     Commands                                *
  ***********************************************/

  move() {
    let oldRow = this.state.karelRow;
    let oldCol = this.state.karelCol;
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
        karelRow:newRow,
        karelCol:newCol
      }, this.onStepFinished)
    } else {
      this.error('Front Is Blocked');
    }
  }

  pickStone() {
    let row = this.state.karelRow;
    let col = this.state.karelCol
    if (this.stonesPresent(row, col)) {
      this.setState(state => {
        const stones = state.stones
        stones[row][col]--
        return {
          stones
        };
      }, this.onStepFinished);
    } else {
      this.error('No Stones Present');
    }
  }

  placeStone() {
    let row = this.state.karelRow;
    let col = this.state.karelCol
    this.setState(state => {
      const stones = state.stones
      stones[row][col]++
      return {
        stones
      };
    }, this.onStepFinished); 
  }

  turnLeft() {
    var newD = this.state.dir;
    switch(this.state.dir) {
      case 'East':  newD = 'North'; break;
      case 'West':  newD = 'South'; break;
      case 'North': newD = 'West'; break;
      case 'South': newD = 'East'; break; 
      default: alert("invalid this.dir: " + this.dir); break; 
    }
    this.setState({
      dir:newD
    }, this.onStepFinished)
  }

  frontIsClear() {
    let oldRow = this.state.karelRow;
    let oldCol = this.state.karelCol;
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

  stonesPresent() {
    let r = this.state.karelRow
    let c = this.state.karelCol
    return this.state.stones[r][c] > 0
  }

 /***********************************************
  *     Model                                   *
  ***********************************************/

  isMoveValid(startR, startC, endR, endC) {
    console.log('isMoveValid')
    if(endC < 0 || endC >= this.props.nCols) return false;
    if(endR < 0 || endR >= this.props.nRows) return false;

    var dRow = Math.abs(endR - startR);
    var dCol = Math.abs(endC - startC);

    // check for walls
    let isEast = startC + 1 === endC
    let isWest = startC - 1 === endC
    let isNorth = startR - 1 === endR
    let isSouth = startR + 1 === endR
    console.log(isEast, isWest, isNorth, isSouth)

    // walls are only north and east
    if(isEast && this.hasEastWall(startR, startC)) return false
    if(isWest && this.hasEastWall(endR, endC)) return false
    if(isNorth && this.hasNorthWall(startR, startC)) return false
    if(isSouth && this.hasNorthWall(endR, endC)) return false

    // can only move 1 manhattan distance
    if (dRow + dCol != 1) return false; 

    return true
  }

  hasEastWall(r, c) {
    console.log('hasEastWall', r, c)
    return this.hasWall(r, c, 'East')
  }

  hasNorthWall(r, c) {
    return this.hasWall(r, c, 'North')
  }

  // dir can only be east or north...
  hasWall(r, c, dir) {
    console.log(this.props.walls)
    for(let wallIndex in this.props.walls) {
      let wall = this.props.walls[wallIndex]
      console.log('wall', wall)
      if(wall.r == r && wall.c == c && wall.d == dir) {
        return true
      }
    }
    return false
  }

 /***********************************************
  *     Render                                *
  ***********************************************/

  error(message) {
    Swal.fire({
      title: message,
      icon: 'error',
      toast:true,
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

  getKarelImg() {
    switch(this.state.dir) {
      case 'North': return KarelNorth
      case 'South': return KarelSouth
      case 'East': return KarelEast
      case 'West': return KarelWest
      default: return KarelNorth
    }
  }

  renderInnerWalls() {
    var walls = []
    if(!('walls' in this.props)) return <div />
    for (var i = 0; i < this.props.walls.length; i++) {
      let wall = this.props.walls[i]
      
      if(wall.d == 'North') {
        let x = this.getCornerX(wall.r, wall.c)
        let y = this.getCornerY(wall.r, wall.c)
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
        let x = this.getCornerX(wall.r, wall.c+1)
        let y = this.getCornerY(wall.r, wall.c)
        walls.push(<div
          className="wall" 
          style={{
            marginLeft:x,
            marginTop:y,
            width:2,
            height:this.getCornerSize(),
          }}
          key={i}
        ></div>)
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

  renderStones() {
    var stoneList = []
    for (var r = 0; r < this.props.nRows; r++) {
      for(var c = 0; c < this.props.nCols; c++) {
        let nStones = this.state.stones[r][c]
        if(nStones > 0) {
          stoneList.push({r:r,c:c,n:nStones})
        }
      }
    }
    return <div>
      {
        stoneList.map((stone, index) => {
          let size = BEEPER_IMG_PCT * this.getCornerSize()
          let offset = (this.getCornerSize() - size)/2
          let x = this.getCornerX(stone.r, stone.c) + offset
          let y = this.getCornerY(stone.r, stone.c) + offset
          let text = stone.n > 1 ? stone.n : ''
          return (
            <div className="stone" style={{
              width:size,height:size,
              marginLeft:x,marginTop:y
            }}>
              <div 
                key={index}
                className ="stoneDiamond"
              />
              <span className="stoneText" style={{
                fontSize:size * 0.75,
                marginTop:-size * 1.05,
                width:size
              }}>{text}</span>
            </div>
          )
        })
      }
    </div>
  }

  renderKarel() {
    let row = this.state.karelRow
    let col = this.state.karelCol
    let cornerSize = this.getCornerSize()
    let size = KAREL_IMG_PCT * this.getCornerSize()
    let offset = (cornerSize - size)/2
    let x = this.getCornerX(row, col) + offset
    let y = this.getCornerY(row, col) + offset
    return (<img
      className="karel"
      style={{marginLeft:x,marginTop:y}}
      width={size}
      height={size}
      src={this.getKarelImg()}>
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
        {this.renderStones()}
        {this.renderKarel()}
      </div>
    )
  }
}

export default KarelWorld
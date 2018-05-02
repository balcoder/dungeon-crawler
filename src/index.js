import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// creates a grid box
class Box extends React.Component  {
  selectBox = () => {
    // row and col come as props from grid
    this.props.selectBox(this.props.row, this.props.col);
  }
  render() {
    return(
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}


class Grid extends React.Component {
  render() {
    const width = this.props.cols * 16;
    var rowsArr = [];

    var boxClass = '';
    for(var i = 0; i < this.props.rows; i++) {
      for(var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        // initially all set to false in main now check what color to give box
        // depending on true or false
        //boxClass = this.props.gridFull[i][j] ? 'box on': 'box off';
        console.log(this.props.gridFull[i][j].tileType);
        switch (this.props.gridFull[i][j].tileType) {
          case 'blank':
            boxClass = 'box blank';
            break;
          case 'user':
            boxClass = 'box user';
            break;
          case 'weapon':
            boxClass = 'box weapon';
            break;
          case 'health':
            boxClass = 'box health';
            break;
          case 'portal':
            boxClass = 'box portal';
            break;
          case 'enemy':
            boxClass = 'box enemy';
            break;
          default:
            console.log('no color for box tile');

        }

        // push jsx box component onto array
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return(
      <div className='grid' style={{width: width}}>
        {rowsArr}
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.rows = 40;
    this.cols = 75;

    this.state = {
      health: 0,
      level: 0,
      weapon: 'fist',
      weapons: ['fist','stick','knife','sword'],
      userPosition: [],
      healthPosition: [],
      weaponPosition: [],
      enemyPosition: [],
      portalPosition: [],
      // create the grid (two dimensional array) by filling a rows array using
      // map with blank values
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill({tileType: "blank"}))
    }
    this.getRndBlankBox = this.getRndBlankBox.bind(this);
  }

  selectBox = (row, col) => {
    // make a copy of the grid
    let gridCopy = arrayClone(this.state.gridFull);
    // set the box that's moved to the opposite
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }

  // returns array of row and col position
  getRndBlankBox = () => {
      let isBlank = false;
      do {
        // make a copy of the grid
        var gridCopy = arrayClone(this.state.gridFull);
        // get a random box in the grid
        var randRow = Math.ceil(Math.random() * (gridCopy.length + 1) );
        var randCol = Math.ceil(Math.random() * (gridCopy[randRow].length + 1));
        if (gridCopy[randRow][randCol].tileType === "blank") {
          isBlank = true;
        }
      } while (isBlank === false);

    return [randRow, randCol];
  }



  // set random boxes to health, weapons, enemies, portal to next level and user
  // seed = (healthPos) => {
  //
  //
  //   // make a copy of the grid
  //   let gridCopy = arrayClone(this.state.gridFull);
  //   // get a random box in the grid
  //   let randRow = Math.ceil(Math.random() * (gridCopy.length + 1) );
  //   let randCol = Math.ceil(Math.random() * (gridCopy[randRow].length + 1));
  //
  //    gridCopy[randRow][randCol].tileType = 'user';
  //   // this.setState({
  //   //   gridFull: gridCopy
  //   // });
  //
  //     this.setState({
  //       userPosition: [randRow,randCol],
  //       healthPosition: healthPos,
  //       weaponPosition: [],
  //       enemyPosition: [],
  //       portalPosition: [],
  //       gridFull: gridCopy
  //     })
  // }
  seed = () => {

    var user = this.getRndBlankBox();
    var health = this.getRndBlankBox();
    var weapon = this.getRndBlankBox();
    var enemy = this.getRndBlankBox();
    var portal = this.getRndBlankBox();

    //make a copy of the grid
    let gridCopy = arrayClone(this.state.gridFull);
    // set tileType for css class definition
    gridCopy[user[0]][user[1]].tileType = 'user';
    gridCopy[health[0]][health[1]].tileType = 'health';
    gridCopy[weapon[0]][weapon[1]].tileType = 'weapon';
    gridCopy[enemy[0]][enemy[1]].tileType = 'enemy';
    gridCopy[portal[0]][portal[1]].tileType = 'portal';

    // update the state
    this.setState({
      userPosition:user,
      healthPosition: health,
      weaponPosition:weapon,
      enemyPosition: enemy,
      portalPosition: portal,
      gridFull: gridCopy
    });
  }

  componentDidMount() {
  //let healthPos = this.getRndBlankBox();
  this.seed(this.getRndBlankBox());

  }
  render() {
    return(
      <div>
        <h1>Dungeon Crawler Game</h1>
        <Grid
          gridFull = {this.state.gridFull}
          rows = {this.rows}
          cols = {this.cols}
          selectBox = {this.selectBox}
          getRndBlankBox = {this.getRndBlankBox}
        />
        <h3>Level: {this.state.level} Health: {this.state.health} Weapon: {this.state.weapon}</h3>
      </div>
    );
  }
}
// deep clone the nested array
 function arrayClone(arr) {
   return JSON.parse(JSON.stringify(arr));
 }
ReactDOM.render(<Main />, document.getElementById('root'));

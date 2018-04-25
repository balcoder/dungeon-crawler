import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Box extends React.Component  {
  selectBox = () => {
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
        // check what color to give box depending on true or false
        boxClass = this.props.gridFull[i][j] ? 'box on': 'box off';
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
      // create the grid (two dimensional array) by filling a rows array using
      // map with false values
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
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
        />
        <h3>Level: {this.state.level} Health: {this.state.health} Weapon: {this.state.weapon}</h3>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

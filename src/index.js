import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component {
  render() {
    return(
      <div>
        Grid
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      health: 0,
      level: 0,
      weapon: 'fist',
      weapons: ['fist','stick','knife','sword']
    }
  }
  render() {
    return(
      <div>
        <h1>Dungeon Crawler Game</h1>
        <Grid />
        <h3>Level: {this.state.level} Health: {this.state.health} Weapon: {this.state.weapon}</h3>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

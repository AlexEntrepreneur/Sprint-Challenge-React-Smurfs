import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

const apiURL = 'http://localhost:3333/smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    this.getSmurfs();
  }

  //====== API REQUEST CODE ======//

  request = (url, method, successCallback, failCallback, payload) => {
    switch (method) {
    case 'GET':
      axios.get(url)
        .then(res => {
          successCallback(res.data);
        })
        .catch(err => {
          failCallback(err);
        })
      break;
    case 'POST':
      axios.post(url, payload)
        .then(res => {
          successCallback(res.data);
        })
        .catch(err => {
          failCallback(err);
        })
      break;
    default:
      console.error(`Request to ${url} failed. Please check your config.`);
    }
  }

  getSmurfs = () => {
    const setSmurfsToState = (data) => this.setDataToState(data, ['smurfs']);
    this.request(apiURL, 'GET', setSmurfsToState);
  }

  addSmurf = (smurf) => {
    const setSmurfsToState = (data) => this.setDataToState(data, ['smurfs']);
    this.request(apiURL, 'POST', setSmurfsToState, null, smurf);
  }

  //====== STATE UTILITY FUNCTIONS ======//

  setDataToState = (data, stateKeysArray) => {
    for (let key in stateKeysArray) {
      this.setState({ [stateKeysArray[key]]: data });
    }
  }

  render() {
    return (
      <div className="App">
        <SmurfForm addSmurf={this.addSmurf} />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;

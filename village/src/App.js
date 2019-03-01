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
    let receivedData = null;
    switch (method) {
    case 'GET':
      axios.get(url)
        .then((res) => {
          receivedData = res.data;
          successCallback(res.data);
        })
        .catch((res) => {
          receivedData = res.data;
          failCallback(res.data);
        })
      break;
    default:
      console.error('request failed');

      return receivedData;
    }
  }

  getSmurfs = () => {
    const setSmurfsToState = (data) => this.setDataToState(data, ['smurfs']);
    this.request(apiURL, 'GET', setSmurfsToState);
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
        <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;

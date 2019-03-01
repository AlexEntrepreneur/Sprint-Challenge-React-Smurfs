import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import SiteNav from './components/SiteNav';
import Smurfs from './components/Smurfs';
import SmurfForm from './components/SmurfForm'
import './App.css';


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
        <SiteNav />
        <Route
          exact
          path="/"
          render={pr =>
            <Smurfs {...pr} smurfs={this.state.smurfs} />
        }/>
        <Route
          path="/smurf-form"
          render={pr =>
            <SmurfForm {...pr} addSmurf={this.addSmurf} />
          }
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class SmurfForm extends Component {
  smurfNameInput = React.createRef();
  smurfAgeInput = React.createRef();
  smurfHeightInput = React.createRef();

  onSmurfFormSubmit = event => {
    event.preventDefault();
    const nameValue = this.smurfNameInput.current.value;
    const ageValue = this.smurfAgeInput.current.value;
    const heightValue = this.smurfHeightInput.current.value;
    const smurf = { name: nameValue, age: ageValue, height: heightValue }
    const formIsFilled = nameValue && ageValue && heightValue;

    if (formIsFilled){
      this.props.addSmurf(smurf);
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.onSmurfFormSubmit}>
          <input
            placeholder="name"
            ref={this.smurfNameInput}
            name="name"
          />
          <input
            type="number"
            placeholder="age"
            ref={this.smurfAgeInput}
            name="age"
          />
          <input
            placeholder="height"
            ref={this.smurfHeightInput}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;

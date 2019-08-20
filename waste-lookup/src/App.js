import React from 'react';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
    fetch(Url).then(res => res.json()).then(data => console.log(data));
  }

  render () {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      sections: null
    }
    // allows getSection to always have access to the state
    this.getSection = this.getSection.bind(this)
  }

  getSection() {
    return fetch(`http://localhost:4741/`)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(myJson =>  {
        this.setState({
          sections: myJson.sections
        })
        console.log(this.state)
      })
  }
  componentDidMount() {
    this.getSection()
  }
  componentWillUnmount() {
    this.setState({
      sections: null
    })
  }
  render() {
    const { sections } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {sections &&
          <div>
            <img src={sections[0].imageURL} alt={sections[0].name} />
            <h1>{sections[0].name}</h1>
          </div>
        }
      </div>
    );
  }
}

export default App;

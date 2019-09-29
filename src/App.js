import React from "react";
import "./App.css";
import Example from "./Example";

export const FarContext = React.createContext("fromfar");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unMount: false
    };
  }

  toggle = () => {
    this.setState(currState => ({
      unMount: !currState.unMount
    }));
  };

  render() {
    return (
      <div className="App">
        {!this.state.unMount && (
          <FarContext.Provider value={this.state.unMount}>
            <Example />
          </FarContext.Provider>
        )}
        <button onClick={this.toggle}>toggle</button>
      </div>
    );
  }
}

export default App;

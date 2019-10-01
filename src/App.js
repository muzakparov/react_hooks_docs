import React from "react";
import "./App.css";
import Example from "./Example";
import ExampleClass from "./ExampleClass";
import FancyInput from "./FancyButton";

export const FarContext = React.createContext("fromfar");
export const AboveFarContext = React.createContext("abovefromfar");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unMount: false,
      contextValue: 0,
      anotherContext: "a"
    };

    this.myRef = React.createRef();
  }

  toggle = () => {
    this.setState(currState => ({
      unMount: !currState.unMount
    }));
  };

  componentDidMount() {
    const timeoutId = setTimeout(() => {
      this.setState({ contextValue: 1 });
      this.myRef.current.focus();

      clearTimeout(timeoutId);
    }, 2500);
  }

  render() {
    return (
      <div className="App">
        <div>
          {!this.state.unMount && (
            <AboveFarContext.Provider value={this.state.anotherContext}>
              <FarContext.Provider value={this.state.contextValue}>
                <Example initialCount={0} />
              </FarContext.Provider>
            </AboveFarContext.Provider>
          )}
        </div>

        <div>
          <ExampleClass />
        </div>
        <div>
          <FancyInput ref={this.myRef} />
        </div>

        <div>
          {" "}
          <button onClick={this.toggle}>toggle</button>
        </div>
      </div>
    );
  }
}

export default App;

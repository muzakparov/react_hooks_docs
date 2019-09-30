import React from "react";

export default class ExampleClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false
    };
  }

  componentDidMount() {
    //debugger;
  }

  render() {
    return "ExampleClass";
  }
}

import React from "react";
import { directive } from "@babel/types";

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
    return <div>ExampleClass</div>;
  }
}

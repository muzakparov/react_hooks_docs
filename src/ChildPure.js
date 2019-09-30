import React, { useState, useEffect, useContext } from "react";

export default class ChildPure extends React.PureComponent {
  render() {
    console.log("ChildPure");
    return <div>ChildPure</div>;
  }
}

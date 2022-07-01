import React from "react";

const Spinner = (props) => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};

//default if message is not specified in index.js where Spinner is being called.
Spinner.defaultProps = {
  message: "Loading...",
};

export default Spinner;

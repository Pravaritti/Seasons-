import React from "react";
import ReactDOM from "react-dom";

// //Functional Component
// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
//   ); //it will take some time to respond
//   //it will ask with a popup window if you want to allow or block sharing of your location
//   //try block (by clicking on i)-> it will give u the reason on console
//   //so as this takes some time

//   return <div>Latitude: </div>;
// };

//Class Component
class App extends React.Component {
  //extends React.Component because we borrow many methods from this other class that REACT expects us to have in ourder to use class based component

  //called any time a new instance is created, automatically and instantly
  //has props object
  constructor(props) {
    super(props); //have to do this step

    //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
    this.state = {
      lat: null, //when we dont have the value but we know that eventually it will be a number};

      errorMessage: "",
    };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);

        //to update our state object, we use setState
        //we got setState automatically when we extended App.Component
        this.setState({ lat: position.coords.latitude });

        //this.state.lat = position.coords.latitude
        //never do direct assignemtn to state object
      },
      (err) => {
        console.log(err);

        this.setState({ errorMessage: err.message });
      }
    );
  }

  render() {
    //We never ever want to initialize some work or some request from a call in render method. why? coz render method gets called every time state gets updated.
    // window.navigator.geolocation.getCurrentPosition(
    //   (position) => console.log(position),
    //   (err) => console.log(err)
    // );
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }

    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
//show an instance of my App component and then as the second argument to this thing, i'm going to provide reference to that div with ID of root inside if iur indexed HTML .

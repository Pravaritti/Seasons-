import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

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

  /* //called any time a new instance is created, automatically and instantly
  //has props object
  constructor(props) {
    super(props); //have to do this step

    //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
    this.state = {
      lat: null, //when we dont have the value but we know that eventually it will be a number};

      errorMessage: "",
    };
  }*/

  //another way to initialize state without using constructor function
  state = { lat: null, errorMessage: "" };
  //

  componentDidMount() {
    console.log("My component was rendered to the screen");
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

  componentDidUpdate() {
    console.log("My component was just updated - it rerendered!");
  }

  //helper function to get red border for every return statement. purpose = avoid duplication of same code in every return statement
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />; //creating an instance
      //passing props into it
    }

    return <Spinner message="Please accept location request" />;
  }
  render() {
    //We never ever want to initialize some work or some request from a call in render method. why? coz render method gets called every time state gets updated.
    // window.navigator.geolocation.getCurrentPosition(
    //   (position) => console.log(position),
    //   (err) => console.log(err)
    // );

    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
//show an instance of my App component and then as the second argument to this thing, i'm going to provide reference to that div with ID of root inside if iur indexed HTML .

//constructor function -> optionally defined. if we define it, it will be automatically called when a new instance of our component is created.
//render method -> not optional. thechnically render method is a lifecycle function. it gets called at some point during the lifecycle of a component.
//what all happens?
// constructor function is called -> render function is called -> returns some JSX and that content becomes visible on screen-> after that we see different series of methods beign called at different points of time. -> after our component first renderes onto the screen (content first shows up), this componentDidMount() method is called (automatically) only once,immediately after render

//componenetDidMount -> we can set up some code in it like initial data loading etc. that we might want to do one time when our compoenent shows up.

//now our compoenent sits around and waits after componentDidMount and waits for update i.e. setState method or rerender. anytime this happens, another lifecycle method is called automatically.

//componentDidUpdate -> gets called everytime our component gets updated. after this our component sits and wait until it is no longer shown/displayed. then next method is called
//PS -> anytime our component updates, render will be called and will return some JSX that will be shown on the screen. and right after that componentDidUpdate will be invoked.

//componentWillUnmount ->this method will be used if we wanna do some kind of cleanup after our component

/*
constructor -> good to do one time thing or initial data fetching or things that we need as soon as an object is made.

render -> avoid doing anything besides returning JSX. not going to ever make any network request etc.

componentDidMount 0> perfect loaction for some initial data loading  or kick out some outside process, like getting user location, if u have to do this thing only one time. best practice is do not do data loading inconstructor function. (recommended)because if you centralize all your data loadking stuff here as opposed to spreadin it out to constructor and componentDidMount -> it will be more clear code.

compoenentDidUpdate -> good place for data loading that needs to be done everytime a component is updated.

componentWillUnmount -> doesnt get used that often anymore

*/

//the code that we write in our code editor is not what shows up in our browser. it actually runs thru the tool BABEL and the code gets converted to some form of JS which can be run byall popular browsers

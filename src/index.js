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
  //called any time a new instance is created, automatically and instantly
  //has props object
  constructor(props) {
    super(props); //have to do this step
    //as our class is borrowing functionality from class React.Component. this base class has its own constructor function that goes through some amount of setup that has some code inside of it to set up a react component for us.
    //so when we make our own constructor function, we are basically overridding the consytructor function inside of the react component class.But we still want to make sure that all the setup cide inside of this constructor function still gets called. So to make sure the parent's constructor function us called, we call super with props.

    //to initialize state object -> which will eventually contain important data (properties)
    //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
    this.state = {
      lat: null, //when we dont have the value but we know that eventually it will be a number};
      //can refer to this object and its properties anywhere within App component

      errorMessage: "",
    };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);

        //to update our state object, we use setState
        //we got setState automatically when we extended App.Component
        this.setState({ lat: position.coords.latitude });

        //we did not do this
        //this.state.lat = position.coords.latitude
        //never do direct assignemtn to state object
      },
      (err) => {
        console.log(err);

        this.setState({ errorMessage: err.message });
      }
    );
  }

  //render method will keep getting called, way more than you can imagine because it keeps rerendering
  //everytime state gets updated, render is called again
  //as render method will be called quite frequently, so what is the best place to put function calls that take some amount of time to run??

  render() {
    //We never ever want to initialize some work or some request from a call in render method. why?
    // window.navigator.geolocation.getCurrentPosition(
    //   (position) => console.log(position),
    //   (err) => console.log(err)
    // );
    return (
      <div>
        Latitude: {this.state.lat}
        Error: {this.state.errorMessage}
      </div>
    );
  }
}
//When we make a class, we are creating a new class inside of JS that has just one method assigned to it and that is the render method.
//in order to use a class based component with react, REACT expects that are class based components, has many other methods attacked to it. normally we do not implement these methods by ourselves.
//Instead we borrow all these other methods from this other class called React.Component. This is the reason we extend this component -> that it allows us to pull a ton of built in functionality from other class called React.Component into our class.
// this does not solve any problems that we have around fetching or taking too long to determine our physical location, It is just one step towards getting towards the solution.

//Step2: use react's state system

ReactDOM.render(<App />, document.querySelector("#root"));
//show an instance of my App component and then as the second argument to this thing, i'm going to provide reference to that div with ID of root inside if iur indexed HTML .

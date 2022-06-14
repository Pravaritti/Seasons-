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
  render() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => console.log(position),
      (err) => console.log(err)
    );
    return <div>Latitude: </div>;
  }
}
//When we make a class, we are creating a new class inside of JS that has just one method assigned to it and that is the render methid.
//in order to use a class based component with react, REACT expects that are class based components, has many other methods attacked to it. normally we do not implement these methods by ourselves.
//Instead we borrow all these other methods from this other class called React.Component. This is the reason we extend this component -> that it allows us to pull a ton of built in functionality from other class called React.Component into our class.
// this does not solve any problems that we have around fetching or taking too long to determine our physical location, It is just one step towards getting towards the solution.

//Step2: use react's state system
ReactDOM.render(<App />, document.querySelector("#root"));
//show an instance of my App component and then as the second argument to this thing, i'm going to provide reference to that div with ID of root inside if iur indexed HTML .

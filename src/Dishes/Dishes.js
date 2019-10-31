import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING"
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes()
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
          <li key={dish.id}>{dish.title}</li>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>
        <ul>{dishesList}</ul>
      </div>
    );
  }
}

export default Dishes;

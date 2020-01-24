import React, { Component } from "react";

class SearchWeather extends Component {
  state = { cityName: "" };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.cityName);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Name Of the City"
            className="form-control w-50 mx-auto"
            value={this.state.cityName}
            onChange={event => this.setState({ cityName: event.target.value })}
            style={{ boxShadow: "0 0 0 0 #fff" }}
          />
        </div>
      </form>
    );
  }
}

export default SearchWeather;

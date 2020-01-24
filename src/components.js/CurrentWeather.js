import React, { Component } from "react";
import {
  convertToTime,
  createFahrenheitTemps,
  createCelciusTemps
} from "../convertFunctions/convert";

class CurrentWeather extends Component {
  state = {
    onClickProperties: {
      celcius: { color: "text-secondary" },
      fahrenheit: { color: "text-light" }
    },
    convertedTemps: { temp: null, temp_min: null, temp_max: null },
    showedTemp: "fahrenheit"
  };

  componentDidMount() {
    const { main } = this.props.data;
    this.setState({
      convertedTemps: createFahrenheitTemps(main)
    });
  }

  componentDidUpdate(prevProps) {
    const newTemp = this.props.data.main.temp;
    const prevTemp = prevProps.data.main.temp;
    if (prevTemp !== newTemp) {
      const { main } = this.props.data;
      this.setState({
        onClickProperties: {
          celcius: { color: "text-secondary" },
          fahrenheit: { color: "text-light" }
        },
        convertedTemps: createFahrenheitTemps(main)
      });
    }
  }

  // fucntion for Celcius span when it is clicked

  onCelciusClick = () => {
    this.setState({
      onClickProperties: {
        celcius: { color: "text-light" },
        fahrenheit: { color: "text-secondary" }
      },
      convertedTemps: createCelciusTemps(this.props.data.main)
    });
    this.props.changeShowedTemp("celcius");
  };

  // fucntion for Fahrenheit span when it is clicked

  onFahrenheitClick = () => {
    this.setState({
      onClickProperties: {
        celcius: { color: "text-secondary" },
        fahrenheit: { color: "text-light" }
      },
      convertedTemps: createFahrenheitTemps(this.props.data.main),
      showedTemp: "fahrenheit"
    });
    this.props.changeShowedTemp("fahrenheit");
  };

  render() {
    const { main, name, weather, wind, sys } = this.props.data;
    return (
      <div className="p-3">
        <div className="d-flex">
          <div className="col-5 p-1">
            <div className="d-flex">
              <h3 className="text-light text-capitalize d-inline-block">
                feels like {Math.floor(this.state.convertedTemps.temp)}
              </h3>
              <div className="ml-2">
                <span
                  className={`mr-1 ${this.state.onClickProperties.celcius.color}`}
                  style={{ cursor: "pointer" }}
                  onClick={this.onCelciusClick}
                >
                  °C
                </span>
                <span className="mr-1 text-light">|</span>
                <span
                  className={this.state.onClickProperties.fahrenheit.color}
                  style={{ cursor: "pointer" }}
                  onClick={this.onFahrenheitClick}
                >
                  °F
                </span>
              </div>
            </div>
            <div>
              <div className="d-flex">
                <span
                  className="text-light text-capitalize d-inline-block col-6 p-0"
                  style={{ fontSize: "1.2rem" }}
                >
                  min {Math.floor(this.state.convertedTemps.temp_min)}
                  <i
                    className="fas fa-arrow-down text-light ml-2"
                    style={{ fontSize: "1.2rem" }}
                  />
                </span>
                <span
                  className="text-light text-capitalize d-inline-block col-6 p-0"
                  style={{ fontSize: "1.2rem" }}
                >
                  max {Math.floor(this.state.convertedTemps.temp_max)}
                  <i
                    className="fas fa-arrow-up text-light ml-2"
                    style={{ fontSize: "1.2rem" }}
                  />
                </span>
              </div>
              <div className="d-flex">
                <span className="text-light text-capitalize d-inline-block col-6 p-0">
                  {`sunrise ${convertToTime(sys.sunrise)}`}
                </span>
                <span className="text-light text-capitalize d-inline-block col-6 p-0">
                  {`sunset  ${convertToTime(sys.sunset)}`}
                </span>
              </div>
            </div>
          </div>
          <div className="col-3 p-1 d-flex flex-column justify-content-start">
            <div className="d-flex align-items-start justify-content-start">
              <h3 className="text-light text-capitalize">
                {weather[0].description}
              </h3>
              <img
                className="d-inline-block"
                style={{ width: "50px", marginTop: "-8px" }}
                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
            <h4 className="text-light text-capitalize">
              {name} , {sys.country}
            </h4>
          </div>
          <div className="col-2 p-1 d-flex justify-content-around align-items-start">
            <i
              className="fas fa-tint text-light align-self-center"
              style={{ fontSize: "1.5rem", marginTop: "-10px" }}
            />
            <div className="d-inline-block">
              <h3 className="text-light">{main.humidity}%</h3>
              <h4 className="text-secondary text-capitalize">humidity</h4>
            </div>
          </div>
          <div className="col-2 p-1 d-flex justify-content-around align-items-start">
            <i
              className="fas fa-wind text-light align-self-center"
              style={{ fontSize: "1.5rem", marginTop: "-10px" }}
            />
            <div className="d-inline-block">
              <h3 className="text-light">{wind.speed} mph</h3>
              <h4 className="text-secondary text-capitalize">wind</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;

import React, { Component } from "react";
import Header from "./Header";
import Loader from "./Loader";
import CurrentWeather from "./CurrentWeather";
import SearchWeather from "./SearchWeather";
import HourlyWeather from "./HourlyWeather";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      coords: {
        latitude: null,
        longitude: null
      },
      currentWeatherData: {
        main: { temp: null, humidity: null, temp_min: null, temp_max: null },
        weather: [{ description: null, icon: null }],
        name: null,
        sys: { country: null },
        wind: { speed: null }
      },
      hourlyWeatherList: [],

      // temperature showed in fahrenheit or celcius on screen

      showedTemp: "fahrenheit"
    };

    this.key = "f67f875da7915dc3e498ee1cb2c4f8d3";
  }

  // getting coordiantions by geolocation API

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          coords: {
            latitude,
            longitude
          }
        });
      });
    } else {
      prompt("can't retreive your location coordination");
    }
    console.log(this.state.coords.latitude);
  }

  // fetch current weather data from open weather API

  componentDidUpdate(prevProps, prevState) {
    if (prevState.coords.latitude !== this.state.coords.latitude) {
      this.fetchCurrentWeather();
      this.fetchHourlyforecast();
    }
  }

  // fetch current weather data function

  fetchCurrentWeather = async () => {
    // parameters of the api
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const params = `?APPID=${this.key}&lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}`;
    let response = await axios.get(baseUrl + params);
    this.setState({ currentWeatherData: response.data });
  };

  // fetch current weather and hourly weather data by using name of the city

  onSearchSubmit = async cityname => {
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const params = `?APPID=${this.key}&q=${cityname}`;
    const weather = await axios.get(weatherUrl + params);
    const forecast = await axios.get(forecastUrl + params + "&cnt=15");
    this.setState({
      currentWeatherData: weather.data,
      hourlyWeatherList: forecast.data.list
    });
  };

  // fetch Hourly weather forecast by using coords

  fetchHourlyforecast = async () => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const params = `?APPID=${this.key}&lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&cnt=15`;
    let response = await axios.get(baseUrl + params);
    this.setState({
      hourlyWeatherList: response.data.list
    });
  };

  // change showed temp based on CurrentWeather events

  changeShowedTemp = temp => {
    this.setState({
      showedTemp: temp
    });
  };

  render() {
    if (this.state.currentWeatherData.name === null) {
      return <Loader />;
    } else {
      return (
        <div>
          <Header />
          <div className="mt-3">
            <SearchWeather onSearchSubmit={this.onSearchSubmit} />
          </div>
          <div className="container mt-3 mb-3">
            <div style={{ backgroundColor: "rgb(26, 20, 63)" }}>
              <CurrentWeather
                data={this.state.currentWeatherData}
                changeShowedTemp={this.changeShowedTemp}
              />
            </div>
            <div>
              <HourlyWeather
                weatherItems={this.state.hourlyWeatherList}
                tempCondition={this.state.showedTemp}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;

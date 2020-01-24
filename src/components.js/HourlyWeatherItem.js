import React from "react";
import {
  convertToCelcius,
  convertToFahrenheit
} from "../convertFunctions/convert";

const HourlyWeatherItem = ({ data, tempCondition }) => {
  const { weather, main, dt } = data;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // converting dt number to current date

  const date = new Date(dt * 1000);
  const day = days[date.getDay()];
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const afterHour = date.getHours() > 11 ? "PM" : "AM";

  // convert to desired temperature
  let temp;
  if (tempCondition === "fahrenheit") {
    temp = convertToFahrenheit(main.temp);
  } else {
    temp = convertToCelcius(main.temp);
  }

  return (
    <div className="py-2 d-flex">
      <div className="col-5 d-flex">
        <h5 className="text-capitalize col-5 pr-0">{day}</h5>
        <span
          className="col-2 text-center pr-0"
          style={{ fontSize: "1.25rem" }}
        >
          {hour}
        </span>
        <span style={{ fontSize: "1.25rem" }}>{afterHour}</span>
      </div>
      <div className="col-3">
        <h5>{`${Math.floor(temp)}°`}</h5>
      </div>
      <div className="col-4 d-flex">
        <h5 className="text-left text-capitalize text-secondary col-9">
          {weather[0].description}
        </h5>
        <img
          style={{ width: "50px", marginTop: "-10px" }}
          className="ml-2"
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};

export default HourlyWeatherItem;

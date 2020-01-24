import React from "react";
import HourlyWeatherItem from "./HourlyWeatherItem";

const HourlyWeather = ({ weatherItems, tempCondition }) => {
  const items = weatherItems
    .filter((item, idx) => idx % 2 === 0)
    .map(item => (
      <HourlyWeatherItem
        data={item}
        key={item.dt}
        tempCondition={tempCondition}
      />
    ));
  return (
    <div
      className="p-4 d-flex justify-content-center"
      style={{ backgroundColor: "#bbc4cc" }}
    >
      <div className="col-10">{items}</div>
    </div>
  );
};

export default HourlyWeather;

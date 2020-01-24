// converting kelvin to celcius

export const convertToCelcius = kelvin => kelvin - 273.15;

// converting kelvin to fahrenheit

export const convertToFahrenheit = kelvin => ((kelvin - 273.15) * 9) / 5 + 32;

// creating an object of all new converted temperatures in fahrenheit

export const createFahrenheitTemps = mainObject => {
  const { temp, temp_min, temp_max } = mainObject;
  const newObject = { temp, temp_min, temp_max };
  Object.keys(newObject).forEach(key => {
    const value = newObject[key];
    newObject[key] = convertToFahrenheit(value);
  });

  return newObject;
};

// creating an object of all new converted temperatures in celcius

export const createCelciusTemps = mainObject => {
  const { temp, temp_min, temp_max } = mainObject;
  const newObject = { temp, temp_min, temp_max };
  Object.keys(newObject).forEach(key => {
    const value = newObject[key];
    newObject[key] = convertToCelcius(value);
  });

  return newObject;
};

// converting Unix timestamp to hours and minustes

export const convertToTime = (unixTime = null) => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const midday = hours >= 12 ? "PM" : "AM";
  return `${hours} : ${minutes} ${midday}`;
};

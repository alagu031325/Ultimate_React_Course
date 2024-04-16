import React from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find(key => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  //With class fields we can directly declare properties directly on a component instance right in the class definition - this keyword is no more needed - because this will be attached to component's instance
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  //we can also define methods as class fields aswell
  // async fetchWeather() {
  //arrow function dont have their own this keyword but get access to their surroundign this keyword - so this keyword binding in constructor not needed
  fetchWeather = async () => {
    console.log(this.state.location);
    if (this.state.location?.length < 3) return this.setState({ weather: {} });
    try {
      //we should only pass property that needs to be updated rest will not be overrided
      this.setState({ isLoading: true });

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = e => {
    this.setState({ location: e.target.value });
  };

  //similar to useEffect with [] empty dependancy array - only called on mount
  componentDidMount() {
    //This method is called immediately after rendering
    // this.fetchWeather();
    //Read the localStorage value and render it on mount
    this.setState({ location: localStorage.getItem("location") || "" });
  }

  //React gives this method access to prev props(1st arg) and prev state(2nd arg) - similar to useEffect with [location] in dependancy array - but this will not be called on mount only on re-renders
  componentDidUpdate(prevPros, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      //store the location in localstorage
      localStorage.setItem("location", this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />
        {/* <button onClick={this.fetchWeather}>Get weather</button> */}

        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;

class Input extends React.Component {
  //Child component needs to update a state in parent component - so parent component sends a handler functin to the child (Child to Parent communication)
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for location..."
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}

//Presentational component to just display the weather data
class Weather extends React.Component {
  //similar to returning a cleanup function from useEffect hook
  componentWillUnmount() {
    console.log("Weather component unmounted");
  }

  render() {
    //destructure the received props in each method whichever needs access to props, no common place to destructure
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              code={codes.at(i)}
              key={date}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  //When we dont need to initialize state and when we dont need to explicitly bind the event handler method then we dont need to implicit the constructor
  render() {
    const { date, max, min, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

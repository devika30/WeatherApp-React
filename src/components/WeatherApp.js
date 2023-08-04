import React, { Component } from "react";
import axios from "axios";
import myStyle from "./myStyle.css"

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Mumbai",
      weather: null,
    };
    this.inputRef = React.createRef();
  }

  validateSearch = () => {
    if (this.state.city == "") {
      alert("Kindly enter valid email id");
      return false;
    }
    return true;
  };

  getWeather = async (city = "Mumbai") => {
    if (this.validateSearch()) {
      try {
        const apiKey = "328442a2a4d5a6f1e9d43a77400492a3";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
        const data = await axios.get(
          apiUrl + `&q=${city}` + `&appid=${apiKey}`
        );
        console.log(data);
        this.setState((prevState) => ({
          weather: data.data,
        }));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  componentDidMount() {
    this.getWeather();
    this.inputRef.current.focus();
  }
  getCityValue = (event) => {
    this.setState({
      city: event.target.value,
    });
  };
  render() {
    const { weather, city } = this.state;
    let backClassName;
    if (weather?.weather[0].main == "Clouds") {
      backClassName = "addBackImgCloud";
    } else if (weather?.weather[0].main == "Thunderstorm") {
      backClassName = "addBackImgThunderStorm";
    } else if (weather?.weather[0].main == "Rain") {
      backClassName = "addBackImgRain";
    } else if (weather?.weather[0].main == "Haze") {
      backClassName = "addBackImgHaze";
    } else if (weather?.weather[0].main == "Drizzle") {
      backClassName = "addBackImgDrizzle";
    } else if (weather?.weather[0].main == "Mist") {
      backClassName = "addBackImgMist";
    }
    return (
      <React.Fragment>
        <div className={`weatherBody ${backClassName}`}>
          {console.log(weather?.weather[0].main)}
          <div className="searchBarDiv">
            <input
              type="text"
              value={this.state.city}
              onChange={this.getCityValue}
              ref={this.inputRef}
              className="searchBarInput"
              placeholder="Enter the City"
            />
            <br />
            <button onClick={() => this.getWeather(city)}>
              <img
                className="searchImg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkPD_ZmqvYRoN22NGAiTG-EuD4I9FACxmRCA&usqp=CAU"
              />
            </button>
          </div>
          <br />
          <div className="tempCityDiv">
            <h3>{weather?.main?.temp}°C</h3>
            <h4>{this.state?.city}</h4>
          </div>
          <div className="humSpeedDiv">
            <div>
              <img
                className="humIcon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOyMq1pQBdiNManiDBmhG6wdEPGftn44gZmAOy7LqJzP-w0WQ2k_n-MEro-BNudWLjP0&usqp=CAU"
              />
              <div className="weatherHum">
                <h4>{weather?.main?.humidity}%</h4>
                <h5>Humidity</h5>
              </div>
            </div>

            <div>
              <img
                className="humIcon"
                src="https://img.freepik.com/premium-vector/wind-clouds-icon-weather-forecast-pictogram-wind-icon-wind-blowing-windy-weather-air-icons-doodle-wind-winds-clouds-weather-symbol-wind-speed-icon_754208-73.jpg"
              />
              <div className="weatherHum">
                <h4>{weather?.wind?.speed} km/hr</h4>
                <h5>Wind Speed</h5>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WeatherApp;

import Head from "next/head";
import { getWeatherData } from "../src/api/request";
import { _OpenSans as OpenSans } from "../src/font";

import CS from "../styles/Component.module.css";
import Styles from "../styles/Home.module.css";

import cities from "../src/cities.json";

import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherView from "../src/components/WeatherView";
import { get_weather_data } from "../src/api/client_request";
import { set } from "../src/store";

export default function Home(props) {
  return (
    <HomeComponent
      {...props}
      data={useSelector((state) => {
        return state;
      })}
      dispatch={useDispatch()}
    />
  );
}

class HomeComponent extends Component {
  static CONST_CITY_COUNT = 8;

  constructor(props) {
    super(props);

    this.state = {
      isWaiting: false,
    };
  }

  async componentDidMount() {
    const { data, dispatch } = this.props;

    const objects = Object.entries(data).sort((a, b) => a.time < b.time);

    if (
      objects.length < 8 ||
      objects[0][1].time <= new Date().getTime - WeatherView.CACHE_TIMEOUT
    ) {
      this.setState({ isWaiting: true });
      await get_weather_data(undefined, (res) => {
        dispatch(set(res));
      });
      this.setState({ isWaiting: false });
    }
  }

  render() {
    const { isWaiting } = this.state,
      { data } = this.props,
      objects = Object.entries(data);

    let index = 0;

    return (
      <>
        <Head>
          <title>Weather App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <section className={[OpenSans.className, CS.content].join(" ")}>
          <div className={CS.center}>
            <div
              className={[CS.center, CS.row].join(" ")}
              style={{ margin: "15px 0", overflow: "visible" }}
            >
              <input
                className={CS.textBox}
                placeholder="Enter a city"
                type="text"
                style={{ color: "white", backgroundColor: "#1f2128" }}
              />
              <button
                className={CS.btn}
                style={{ backgroundColor: "var(--highlight)", color: "white" }}
              >
                Add City
              </button>
            </div>
          </div>
          <div className={Styles.weatherContainer}>
            {isWaiting && (
              <>
                <WeatherView type={WeatherView.LOADING} />
                <WeatherView type={WeatherView.LOADING} />
                <WeatherView type={WeatherView.LOADING} />
                <WeatherView type={WeatherView.LOADING} />
                <WeatherView type={WeatherView.LOADING} />
              </>
            )}
            {!isWaiting &&
              (objects.length > 0 ? (
                objects.map((elm) => (
                  <WeatherView
                    data={elm[1]}
                    key={elm[0]}
                    id={elm[0]}
                    type={WeatherView.GROUP_VIEW}
                    style={{ animationDelay: `${0.2 * index++}s` }}
                    className={CS.fadeIn}
                  />
                ))
              ) : (
                <div className={CS.results0}>No results found.</div>
              ))}
          </div>
        </section>
      </>
    );
  }
}

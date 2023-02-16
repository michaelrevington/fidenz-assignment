import Head from "next/head";
import { useRouter } from "next/router";
import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_weather_data } from "../src/api/client_request";
import WeatherView from "../src/components/WeatherView";
import { _OpenSans as OpenSans } from "../src/font";
import { set, setOne } from "../src/store";

import CS from "../styles/Component.module.css";
import Styles from "../styles/WeatherView.module.css";

export default function WeatherViewPage(props) {
  const {id} = useRouter().query;

  return (
    <WeatherViewPageComponent
      {...props}
      data={useSelector((state) => state[id])}
      dispatch={useDispatch()}
      id={id}
    />
  );
}

class WeatherViewPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaiting: !this.props.data,
    };
  }

  async componentDidMount() {
    const { data, id, dispatch } = this.props;

    if (!data || data.time <= new Date() - WeatherView.CACHE_TIMEOUT) {
      this.setState({ isWaiting: true });
      await get_weather_data({ id: id }, (res) => {
        dispatch(set(res));
      });
      this.setState({ isWaiting: false });
    }
  }

  render() {
    console.log(this.props)
    const { data } = this.props,
      { isWaiting } = this.state;

    return (
      <>
        <Head>
          <title>
            {data
              ? `Weather App - ${data.name}, ${data.sys.country}`
              : "Weather App"}
          </title>
        </Head>

        <section
          className={[
            OpenSans.className,
            CS.content,
            CS.center,
            Styles.pageContainer,
          ].join(" ")}
          style={{
            minHeight:
              "calc(100vh - var(--navbar-height) - var(--footer-height))",
          }}
        >
          {isWaiting ? (
            <>
              <WeatherView type={WeatherView.LOADING} />
            </>
          ) : data ? (
            <>
              <WeatherView
                className={CS.fadeIn}
                type={WeatherView.PAGE_VIEW}
                data={data}
              />
            </>
          ) : (
            <>
              <div className={CS.results0}>No results found.</div>
            </>
          )}
        </section>
      </>
    );
  }
} 
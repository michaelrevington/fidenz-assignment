import Image from "next/image";
import { Component } from "react";

import CS from "../../styles/Component.module.css";
import Styles from "../../styles/WeatherView.module.css";

import clouds from "../images/cloud bg copy.png";
import arrow from "../images/arrow_smart.svg";
import close from "../images/close.svg";

import { months_shortned } from "../util";
import {
  _MaterialIcons as MaterialIcons,
  _OpenSans as OpenSans,
} from "../font";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { remove } from "../store";

export default function WeatherView(props) {
  return <WeatherViewComponent {...props} dispatch={useDispatch()} />;
}

WeatherView.LOADING = 0;
WeatherView.GROUP_VIEW = 1;
WeatherView.PAGE_VIEW = 2;
WeatherView.CACHE_TIMEOUT = 5 * 60 * 1000;

class WeatherViewComponent extends Component {
  render() {
    const { type, id, data, className, style, dispatch } = this.props;

    let time, sunrise, sunset;

    switch (type) {
      case WeatherView.LOADING:
        return (
          <>
            <div
              className={[CS.loading, Styles.loading, Styles.view].join(" ")}
            ></div>
          </>
        );
      default:
        (time = new Date(data.time)),
          (sunrise = new Date(data.sys.sunrise)),
          (sunset = new Date(data.sys.sunset));
        return (
          <Link
            disabled={type != WeatherView.GROUP_VIEW}
            onClick={(e) => {
              if (
                e.target.getAttribute("aria-details") === "disabled" ||
                type != WeatherView.GROUP_VIEW
              ) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            href={`/${id}`}
            className={[
              type == WeatherView.GROUP_VIEW
                ? Styles.view
                : Styles.viewComponent,
              className,
            ].join(" ")}
            {...{ style }}
          >
            <div
              className={[CS.center, CS.flexColumn].join(" ")}
              style={{ position: "relative", backgroundColor: data.color }}
            >
              {type === WeatherView.GROUP_VIEW ? (
                <div
                  className={CS.row}
                  style={{ padding: "12px", zIndex: "5" }}
                >
                  <button
                    className={[MaterialIcons.className, Styles.closeBtn].join(
                      " "
                    )}
                    onClick={(e) => {
                      e.target.parentNode.parentNode.parentNode.parentNode.style.maxHeight =
                        "0";
                      setTimeout(() => {
                        dispatch(remove(id));
                      }, 400);
                    }}
                    style={{ float: "right" }}
                  >
                    <Image
                      aria-details="disabled"
                      src={close}
                      width={12}
                      height={12}
                      alt="close"
                    />
                  </button>
                </div>
              ) : (
                <div className={CS.row} style={{ padding: "12px" }}>
                  <Link
                    href={"/"}
                    className={[MaterialIcons.className, Styles.closeBtn].join(
                      " "
                    )}
                  >
                    arrow_back
                  </Link>
                </div>
              )}
              {type == WeatherView.GROUP_VIEW ? (
                <div className={[CS.row, CS.center].join(" ")}>
                  <div
                    className={[
                      CS.center,
                      CS.flexColumn,
                      CS.row,
                      Styles.topColumn,
                    ].join(" ")}
                  >
                    <div
                      style={{ fontSize: "1.5rem" }}
                    >{`${data.name}, ${data.sys.country}`}</div>
                    <div style={{ fontSize: "0.8rem" }}>{`${
                      time.getHours() > 12
                        ? time.getHours() - 12
                        : time.getHours()
                    }.${time.getMinutes()}${
                      time.getHours() > 12 ? "pm" : "am"
                    }, ${
                      months_shortned[time.getMonth()]
                    } ${time.getDate()}`}</div>
                    <div className={CS.center} style={{ marginTop: "20px" }}>
                      <img
                        src={`http://openweathermap.org/img/wn/${data.weather.icon}.png`}
                        width={28}
                        height={28}
                        alt="Weather icon"
                      />
                      <span>{data.weather.description}</span>
                    </div>
                  </div>
                  <div
                    className={[
                      CS.center,
                      CS.flexColumn,
                      CS.row,
                      Styles.topColumn,
                    ].join(" ")}
                  >
                    <div>
                      <span style={{ fontSize: "3rem" }}>{data.main.temp}</span>{" "}
                      <span
                        style={{
                          fontSize: "1.6rem",
                          fontFamily: "Segoe UI Symbol",
                        }}
                      >
                        &#8451;
                      </span>
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      Temp Min: {data.main.temp_min}
                      <span style={{ fontFamily: "Segoe UI Symbol" }}>
                        &#8451;
                      </span>
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      Temp Max: {data.main.temp_max}
                      <span style={{ fontFamily: "Segoe UI Symbol" }}>
                        &#8451;
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={CS.row}>
                  <div className={[CS.center, CS.flexColumn, CS.row].join(" ")}>
                    <div
                      style={{ fontSize: "1.8rem", margin: "8px 0" }}
                    >{`${data.name}, ${data.sys.country}`}</div>
                    <div style={{ fontSize: "0.8rem" }}>{`${
                      time.getHours() > 12
                        ? time.getHours() - 12
                        : time.getHours()
                    }.${time.getMinutes()}${
                      time.getHours() > 12 ? "pm" : "am"
                    }, ${
                      months_shortned[time.getMonth()]
                    } ${time.getDate()}`}</div>
                  </div>
                  <div className={[CS.center, CS.row].join(" ")}>
                    <div
                      className={[
                        CS.center,
                        CS.flexColumn,
                        Styles.viewColumn,
                      ].join(" ")}
                    >
                      <img
                        src={`http://openweathermap.org/img/wn/${data.weather.icon}.png`}
                        width={60}
                        height={60}
                        alt="Weather icon"
                      />
                      <span>{data.weather.description}</span>
                    </div>
                    <hr
                      style={{
                        height: "100px",
                        width: "2px",
                        backgroundColor: "white",
                      }}
                    />
                    <div
                      className={[
                        CS.center,
                        CS.flexColumn,
                        Styles.topColumn,
                        Styles.viewColumn,
                      ].join(" ")}
                    >
                      <div
                        style={{
                          margin:
                            type == WeatherView.PAGE_VIEW ? "15px 0" : "0",
                        }}
                      >
                        <span className={Styles.spanText01}>
                          {data.main.temp}
                        </span>{" "}
                        <span
                          style={{
                            fontSize: "1.6rem",
                            fontFamily: "Segoe UI Symbol",
                          }}
                        >
                          &#8451;
                        </span>
                      </div>
                      <div className={Styles.spanText02}>
                        Temp Min: {data.main.temp_min}
                        <span style={{ fontFamily: "Segoe UI Symbol" }}>
                          &#8451;
                        </span>
                      </div>
                      <div className={Styles.spanText02}>
                        Temp Max: {data.main.temp_max}
                        <span style={{ fontFamily: "Segoe UI Symbol" }}>
                          &#8451;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {type == WeatherView.GROUP_VIEW && (
                <Image
                  src={clouds}
                  alt="Background clouds"
                  style={{
                    position: "absolute",
                    height: "100%",
                    opacity: "0.3",
                    zIndex: "1",
                  }}
                />
              )}
            </div>
            <div className={[CS.center, Styles.row].join(" ")}>
              <div className={Styles.column}>
                <div className={Styles.line}>
                  <span className={Styles.spanBold}>Pressure:</span>{" "}
                  {data.main.pressure}hPa
                </div>
                <div className={Styles.line}>
                  <span className={Styles.spanBold}>Humidity:</span>{" "}
                  {data.main.humidity}%
                </div>
                <div className={Styles.line}>
                  <span className={Styles.spanBold}>Visiblity:</span>{" "}
                  {data.visibility / 1000}km
                </div>
              </div>
              <div
                className={[
                  CS.center,
                  CS.flexColumn,
                  Styles.bottomMidCol,
                  Styles.column,
                ].join(" ")}
              >
                <Image
                  className={Styles.midIcon}
                  src={arrow}
                  width={20}
                  height={20}
                  alt="Arrow"
                />
                <div>
                  {data.wind.speed}m/s {data.wind.deg} degree
                </div>
              </div>
              <div className={Styles.column}>
                <div className={Styles.line}>
                  <span className={Styles.spanBold}>Sunrise:</span>{" "}
                  {sunrise.getHours() > 12
                    ? sunrise.getHours() - 12
                    : sunrise.getHours()}
                  .{sunrise.getMinutes()}
                  {sunrise.getHours > 12 ? "pm" : "am"}
                </div>
                <div className={Styles.line}>
                  <span className={Styles.spanBold}>Sunset:</span>{" "}
                  {sunset.getHours() > 12
                    ? sunset.getHours() - 12
                    : sunset.getHours()}
                  .{sunset.getMinutes()}
                  {sunset.getHours > 12 ? "pm" : "am"}
                </div>
              </div>
            </div>
          </Link>
        );
    }
  }
}

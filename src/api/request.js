import axios from "axios";
import { API } from "./routes";

import cities from "../cities.json";

const request = async (url, params, method, body, headers, onload) => {
  switch (method) {
    case "get":
      if (!params.id) {
        params.id = cities.List.map((elm) => elm.CityCode).join(",");
      }

      await axios
        .get(url, {
          insecureHTTPParser: true,
          ...{ params, headers },
        })
        .then((res) => {
          const timestamp = new Date().getTime();
          if (res.status >= 200 && res.status < 300)
            onload(
              res.data.list.map((data) => {
                const { weather, ...rest } = data;

                weather[0].description = weather[0].description
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.substr(1, word.length)
                  )
                  .join(" ");

                return {
                  ...rest,
                  time: timestamp,
                  color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                    Math.random() * 255
                  })`,
                  weather: {
                    ...weather[0],
                  },
                };
              })
            );
          else onload([]);
        })
        .catch((e) => {
          console.log(e);
          onload([]);
        });
      break;
  }
};

const getWeatherData = async (params, onload) => {
  return await request(
    API.OPEN_WEATHERMAP_API,
    { appid: process.env.API_KEY, units: "metric", ...params },
    "get",
    {},
    {
      "User-Agent": "axios 1.2.5",
      Accept: "application/json",
    },
    onload
  );
};

export { getWeatherData };

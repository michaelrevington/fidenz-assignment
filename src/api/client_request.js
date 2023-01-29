import { INTERNAL_API } from "./routes";

const url_params_join = (url, params) => {
  return `${url}?${new URLSearchParams(params).toString()}`;
};

const xml_request = async (method, url, params, headers, body, callback) => {
  return await new Promise((resolve) => {
    let xml = new XMLHttpRequest();
    xml.open(method, url_params_join(url, params));
    if (headers) {
      Object.entries(headers).forEach((header) => {
        xml.setRequestHeader(header[0], header[1]);
      });
    }
    xml.send(JSON.stringify(body));
    xml.onload = (e) => {
      try {
        const res = JSON.parse(xml.responseText);
        callback(res);
      } catch (e) {
        callback({});
      }
      resolve();
    };
  });
};

const get_weather_data = async (params, callback) => {
  return await xml_request(
    "get",
    INTERNAL_API.WEATHER,
    params,
    undefined,
    {},
    callback
  );
};

export { get_weather_data };

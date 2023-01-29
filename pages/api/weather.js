import { getWeatherData } from "../../src/api/request";

export default async function handler(req, res) {
  let data = {};
  await getWeatherData(req.query, (e) => {
    data = e;
  });
  res.status(200).json(data);
}

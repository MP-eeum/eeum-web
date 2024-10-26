import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import DayOverview from "./DayOverview";
import CurrentWeather from "./CurrentWeather";
import AirCondition from "./AirCondition";
import Hourly from "./Hourly";

interface Item {
  [key: string]: string;
}

interface ItemOverview {
  lowest: number;
  highest: number;
  uv: number;
  rainfall: number;
}

export default function WeatherPage() {
  const url_weather = "VilageFcstInfoService_2.0/getVilageFcst";
  const url_uv = "LivingWthrIdxServiceV4/getUVIdxV4";
  const url_air = "LivingWthrIdxServiceV4/getAirDiffusionIdxV4";

  const [overData, setOverData] = useState<ItemOverview>();
  const [hourlyData, setHourlyData] = useState([]);
  const [airCondition, setAirCondition] = useState();
  const today = new Date();
  const yesterday = new Date();

  useEffect(() => {
    yesterday.setDate(today.getDate() - 1);
    // navigator.geolocation.getCurrentPosition(getWeatherData);
    getWeatherData();
  }, []);

  useEffect(() => {});

  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const getWeatherData = async () => {
    // const lat = Math.floor(position.coords.latitude);
    // const lng = Math.floor(position.coords.longitude);
    const options1 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: formatDate(yesterday),
        base_time: "2300",
        nx: 61,
        ny: 121,
      },
    };
    const options2 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1,
        pageNo: 1,
        dataType: "JSON",
        time: `${formatDate(today)}00`,
        areaNo: "4111500000",
      },
    };
    try {
      const weatherRes = await axios.get(
        `http://apis.data.go.kr/1360000/${url_weather}`,
        options1
      );
      const uvRes = await axios.get(
        `http://apis.data.go.kr/1360000/${url_uv}`,
        options2
      );
      const airRes = await axios.get(
        `http://apis.data.go.kr/1360000/${url_air}`,
        options2
      );

      const weatherData = weatherRes.data.response.body.items.item;
      const UVData = uvRes.data.response.body.items.item;
      const airData = airRes.data.response.body.items.item;

      setOverData({
        lowest: weatherData.filter(
          (item: Item) =>
            item.category === "TMN" && item.fcstDate === formatDate(today)
        )[0].fcstValue,
        highest: weatherData.filter(
          (item: Item) =>
            item.category === "TMX" && item.fcstDate === formatDate(today)
        )[0].fcstValue,
        uv: UVData[0][`h${Math.floor(today.getHours() / 3) * 3}`],
        rainfall: weatherData.filter(
          (item: Item) =>
            item.category === "POP" &&
            item.fcstDate === formatDate(today) &&
            item.fcstTime === `${today.getHours()}00`
        )[0].fcstValue,
      });
      const index = weatherData
        .filter(
          (item: Item) =>
            item.category === "TMP" ||
            item.category === "PTY" ||
            item.category === "SKY"
        )
        .findIndex(
          (item: Item) =>
            item.category === "TMP" && item.fcstTime === `${today.getHours()}00`
        );
      setHourlyData(
        weatherData
          .filter(
            (item: Item) =>
              item.category === "TMP" ||
              item.category === "PTY" ||
              item.category === "SKY"
          )
          .slice(index, index + 72)
      );
      setAirCondition(airData[0][`h${Math.floor(today.getHours() / 3) * 3}`]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="h-12">
        <Header title="기상정보" button={null} />
      </div>
      {hourlyData && (
        <CurrentWeather
          temp={hourlyData[0]}
          sky={hourlyData[1]}
          pty={hourlyData[2]}
        />
      )}
      <div className="flex flex-col max-w-full gap-6 mx-6 text-sm">
        {overData && <DayOverview data={overData} />}
        {hourlyData && <Hourly data={hourlyData} />}
        {airCondition && <AirCondition data={airCondition} />}
      </div>
    </div>
  );
}

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

export default function WeatherPage() {
  const url_weather = "VilageFcstInfoService_2.0/getVilageFcst";
  const url_uv = "LivingWthrIdxServiceV4/getUVIdxV4";
  const url_air = "LivingWthrIdxServiceV4/getAirDiffusionIdxV4";

  const today = new Date();
  const yesterday = new Date();

  useEffect(() => {
    yesterday.setDate(today.getDate() - 1);
    getWeatherData();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const [weatherData, setWeatherData] = useState<Item[]>([]);
  const [uvData, setUvData] = useState<Item[]>([]);
  const [airData, setAirData] = useState<Item[]>([]);

  const getWeatherData = async () => {
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
      const res1 = await axios.get(
        `http://apis.data.go.kr/1360000/${url_weather}`,
        options1
      );
      const res2 = await axios.get(
        `http://apis.data.go.kr/1360000/${url_uv}`,
        options2
      );
      const res3 = await axios.get(
        `http://apis.data.go.kr/1360000/${url_air}`,
        options2
      );

      setWeatherData(res1.data.response.body.items.item);
      setUvData(res2.data.response.body.items.item);
      setAirData(res3.data.response.body.items.item);
    } catch (e) {
      console.log(e);
    }
  };

  if (weatherData.length === 0 || uvData.length === 0 || airData.length === 0)
    return <div>loading</div>;
  return (
    <div className="flex flex-col w-full">
      <div className="h-12">
        <Header title="기상정보" button={null} />
      </div>
      <CurrentWeather
        data={weatherData}
        today={today}
        formatDate={formatDate}
      />
      <div className="flex flex-col max-w-full gap-6 mx-6 text-sm">
        <DayOverview
          data={weatherData}
          uv={uvData}
          today={today}
          formatDate={formatDate}
        />
        <Hourly data={weatherData} today={today} />
        <AirCondition data={airData} today={today} />
      </div>
    </div>
  );
}

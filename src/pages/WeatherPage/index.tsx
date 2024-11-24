import { useEffect, useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import Header from "../../components/Header";
import DayOverview from "./DayOverview";
import CurrentWeather from "./CurrentWeather";
import AirCondition from "./AirCondition";
import Hourly from "./Hourly";
import Weekly from "./Weekly";

interface Item {
  [key: string]: string;
}

const url_weather = "VilageFcstInfoService_2.0/getVilageFcst";
const url_uv = "LivingWthrIdxServiceV4/getUVIdxV4";
const url_air = "LivingWthrIdxServiceV4/getAirDiffusionIdxV4";
const url_week_weather = "MidFcstInfoService/getMidLandFcst";
const url_week_temp = "MidFcstInfoService/getMidTa";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<Item[]>([]);
  const [uvData, setUvData] = useState<Item[]>([]);
  const [airData, setAirData] = useState<Item[]>([]);
  const [weekWeather, setWeekWeather] = useState<Item[]>([]);
  const [weekTemp, setWeekTemp] = useState<Item[]>([]);

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
    const options3 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1,
        pageNo: 1,
        dataType: "JSON",
        regId: "11B00000", //서울, 인천, 경기도
        tmFc:
          today.getHours() >= 18
            ? `${formatDate(today)}1800`
            : `${formatDate(yesterday)}1800`,
      },
    };
    const options4 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1,
        pageNo: 1,
        dataType: "JSON",
        regId: "11B20601", //수원
        tmFc:
          today.getHours() >= 18
            ? `${formatDate(today)}1800`
            : `${formatDate(yesterday)}1800`,
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
      const res4 = await axios.get(
        `http://apis.data.go.kr/1360000/${url_week_weather}`,
        options3
      );
      const res5 = await axios.get(
        `http://apis.data.go.kr/1360000/${url_week_temp}`,
        options4
      );
      setWeatherData(res1.data.response.body.items.item);
      setUvData(res2.data.response.body.items.item);
      setAirData(res3.data.response.body.items.item);
      setWeekWeather(res4.data.response.body.items.item);
      setWeekTemp(res5.data.response.body.items.item);
    } catch (e) {
      console.log(e);
    }
  };

  if (
    weatherData.length *
      uvData.length *
      airData.length *
      weekWeather.length *
      weekTemp.length ===
    0
  )
    return (
      <div className="flex flex-col w-full h-full">
        <div className="h-12">
          <Header title="기상정보" button={null} />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <PulseLoader color="#396951" size="10px" />
        </div>
      </div>
    );
  return (
    <div className="flex flex-col w-full pb-8">
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
        <Weekly
          shorttermData={weatherData}
          weather={weekWeather}
          temp={weekTemp}
        />
      </div>
    </div>
  );
}

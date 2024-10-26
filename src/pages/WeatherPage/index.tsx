import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import DayOverview from "./DayOverview";
import CurrentWeather from "./CurrentWeather";

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
  const [overData, setOverData] = useState<ItemOverview>();
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeatherData);
    // getWeatherData();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const getWeatherData = async (position: any) => {
    // const lat = Math.floor(position.coords.latitude);
    // const lng = Math.floor(position.coords.longitude);
    const options1 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: formatDate(today),
        base_time: "0200",
        nx: 61,
        ny: 121,
      },
    };
    const options2 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        time: `${formatDate(today)}00`,
        areaNo: "4111500000",
      },
    };
    const weatherRes = await axios.get(
      `http://apis.data.go.kr/1360000/${url_weather}`,
      options1
    );
    const uvRes = await axios.get(
      `http://apis.data.go.kr/1360000/${url_uv}`,
      options2
    );

    setOverData({
      lowest: weatherRes.data.response.body.items.item.filter(
        (item: Item) =>
          item.category === "TMN" && item.fcstDate === formatDate(today)
      )[0].fcstValue,
      highest: weatherRes.data.response.body.items.item.filter(
        (item: Item) =>
          item.category === "TMX" && item.fcstDate === formatDate(today)
      )[0].fcstValue,
      uv: uvRes.data.response.body.items.item[0][
        `h${Math.floor(today.getHours() / 3) * 3}`
      ],
      rainfall: weatherRes.data.response.body.items.item.filter(
        (item: Item) =>
          item.category === "POP" &&
          item.fcstDate === formatDate(today) &&
          item.fcstTime === `${today.getHours()}00`
      )[0].fcstValue,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="h-12">
        <Header title="기상정보" button={null} />
      </div>
      <CurrentWeather />
      <div className="flex flex-col gap-6 mx-6 text-sm">
        {overData && <DayOverview data={overData} />}
        <div className="flex h-24 gap-1 px-5 py-4 border rounded-lg border-lightgray"></div>
        <div className="flex flex-col gap-3 px-5 py-4 border rounded-lg border-lightgray">
          <div className="font-semibold">대기질 41 좋음</div>
          <div className="w-full h-5 rounded-xl bg-lightgray"></div>
        </div>
      </div>
    </div>
  );
}

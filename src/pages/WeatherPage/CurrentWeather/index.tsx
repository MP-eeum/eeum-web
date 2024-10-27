import { useEffect, useState } from "react";
import img_sun from "../../../assets/images/img_sun.png";
import img_moon from "../../../assets/images/img_moon.png";
import img_cloud from "../../../assets/images/img_cloud.png";
import img_rain from "../../../assets/images/img_rain.png";
import img_snow from "../../../assets/images/img_snow.png";

interface Item {
  [key: string]: string;
}
interface Props {
  data: Item[];
  today: Date;
  formatDate: (link: Date) => string;
}

export default function CurrentWeather({ data, today, formatDate }: Props) {
  const [weather, setWeather] = useState({
    temp: "",
    time: "",
    sky: "",
    pty: "",
  });

  useEffect(() => {
    const filteredData = data.filter(
      (item: Item) =>
        (item.category === "TMP" ||
          item.category === "PTY" ||
          item.category === "SKY") &&
        item.fcstDate === formatDate(today) &&
        item.fcstTime === `${today.getHours()}00`
    );
    setWeather({
      temp: filteredData[0].fcstValue,
      time: filteredData[0].fcstTime,
      sky: filteredData[1].fcstValue,
      pty: filteredData[2].fcstValue,
    });
  }, []);

  const getWeatherIcon = () => {
    const { time, sky, pty } = weather;
    if (pty === "1" || pty === "4") return img_rain;
    else if (pty === "3") return img_snow;
    else if (sky > "5") return img_cloud;
    else if (time > "6" && time < "18") return img_sun;
    return img_moon;
  };

  return (
    <div className="flex flex-col items-center gap-2 my-8">
      <img className="w-28" alt="img_weather" src={getWeatherIcon()} />
      <div className="text-lg font-semibold">수원시 팔달구</div>
      <div className="text-5xl">{weather.temp}º</div>
    </div>
  );
}

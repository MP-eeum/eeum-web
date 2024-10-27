import { useEffect, useState } from "react";
import icn_sun from "../../../assets/svgs/icn_sun.svg";
import icn_moon from "../../../assets/svgs/icn_moon.svg";
import icn_cloud from "../../../assets/svgs/icn_cloud.svg";
import icn_rain from "../../../assets/svgs/icn_rain.svg";
import icn_snow from "../../../assets/svgs/icn_snow.svg";

interface Item {
  [key: string]: string;
}
interface Props {
  data: Item[];
  today: Date;
}

export default function Hourly({ data, today }: Props) {
  const [hourlyData, setHourlyData] = useState<Item[]>([]);

  useEffect(() => {
    const filteredData = data.filter(
      (item: Item) =>
        item.category === "TMP" ||
        item.category === "PTY" ||
        item.category === "SKY"
    );
    const index = filteredData.findIndex(
      (item: Item) =>
        item.category === "TMP" && item.fcstTime === `${today.getHours()}00`
    );
    const slicedData = filteredData.slice(index, index + 72);
    const pairedData = [];

    for (let i = 0; i < slicedData.length; i += 3) {
      const pair = slicedData.slice(i, i + 3);
      const child = {
        fcstTime: pair[0].fcstTime.slice(0, 2),
        temp: pair[0].fcstValue,
        sky: pair[1].fcstValue,
        pty: pair[2].fcstValue,
      };
      pairedData.push(child);
    }
    setHourlyData(pairedData);
  }, []);

  const getWeatherIcon = (time: string, sky: string, pty: string) => {
    if (pty === "1" || pty === "4") return icn_rain;
    else if (pty === "3") return icn_snow;
    else if (sky > "5") return icn_cloud;
    else if (time > "6" && time < "18") return icn_sun;
    return icn_moon;
  };

  return (
    <div className="flex w-full gap-1 px-5 py-4 border rounded-lg border-lightgray ">
      {hourlyData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-1 min-w-12"
        >
          <div>{item.fcstTime}시</div>
          <img
            alt="weather-icon"
            src={getWeatherIcon(item.fcstTime, item.sky, item.pty)}
          />
          <div>{item.temp}º</div>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import icn_sun from "../../../assets/icons/icn_sun.svg";
import icn_moon from "../../../assets/icons/icn_moon.svg";
import icn_cloud from "../../../assets/icons/icn_cloud.svg";
import icn_rain from "../../../assets/icons/icn_rain.svg";
import icn_snow from "../../../assets/icons/icn_snow.svg";

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
        item.category === "TMP" &&
        item.fcstTime === `${String(today.getHours()).padStart(2, "0")}00`
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
    else if (Number(time) > 6 && Number(time) < 18) return icn_sun;
    return icn_moon;
  };

  return (
    <div className="border rounded-lg border-lightgray">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-1 pl-2 pr-2 py-4">
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
      </div>
    </div>
  );
}

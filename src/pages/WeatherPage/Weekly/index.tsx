import { useEffect, useState } from "react";

import DayItem from "./DayItem";

interface Item {
  [key: string]: string;
}
interface Props {
  shorttermData: Item[];
  weather: Item[];
  temp: Item[];
}

export default function Weekly({ shorttermData, weather, temp }: Props) {
  const [longterm, setLongterm] = useState<Item[]>([]);

  useEffect(() => {
    const shortterm = shorttermData.filter(
      (item: Item) =>
        item.category === "TMN" ||
        item.category === "TMX" ||
        (item.category === "SKY" &&
          (item.fcstTime === "0600" || item.fcstTime === "1800")) ||
        (item.category === "PTY" &&
          (item.fcstTime === "0600" || item.fcstTime === "1800")) ||
        (item.category === "POP" &&
          (item.fcstTime === "0600" || item.fcstTime === "1800"))
    );
    shortterm.sort((a, b) => {
      if (a.fcstDate < b.fcstDate) return -1;
      if (a.fcstDate > b.fcstDate) return 1;
      return 0;
    });

    const result = Object.entries(weather[0]).map(([key, value]) => ({
      key,
      value,
    }));
    const rainfallData = result.slice(1, 11);
    const weatherData = result.slice(14, -3);

    const tempData = Object.entries(temp[0])
      .map(([key, value]) => ({
        key,
        value,
      }))
      .filter(
        (item: Item) => !item.key.includes("Low") && !item.key.includes("High")
      )
      .slice(1, 11);

    const pairedData = [];
    for (let i = 0; i < shortterm.length; i += 8) {
      const pair = shortterm.slice(i, i + 8);
      const child = {
        id: `${i / 8}`,
        rainAm: pair[2].fcstValue,
        rainPm: pair[7].fcstValue,
        weatherAm: getWeatherState(pair[0].fcstValue, pair[1].fcstValue),
        weatherPm: getWeatherState(pair[5].fcstValue, pair[6].fcstValue),
        tempLow: pair[3].fcstValue,
        tempHigh: pair[4].fcstValue,
      };
      pairedData.push(child);
    }

    for (let i = 0; i < rainfallData.length; i += 2) {
      const pair1 = rainfallData.slice(i, i + 2);
      const pair2 = weatherData.slice(i, i + 2);
      const pair3 = tempData.slice(i, i + 2);
      const child = {
        id: `${i / 2 + 3}`,
        rainAm: pair1[0].value,
        rainPm: pair1[1].value,
        weatherAm: pair2[0].value,
        weatherPm: pair2[1].value,
        tempLow: pair3[0].value,
        tempHigh: pair3[1].value,
      };
      pairedData.push(child);
    }
    setLongterm(pairedData);
  }, []);

  const getWeatherState = (sky: string, pty: string) => {
    if (pty === "1" || pty === "4") return "비";
    else if (pty === "3") return "흐리고 눈";
    else if (sky > "5") return "흐림";
    else return "맑음";
  };

  return (
    <div className="flex w-full gap-1 border rounded-lg border-lightgray ">
      <div className="flex flex-col w-full gap-1">
        {longterm.map((item: Item) => (
          <DayItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

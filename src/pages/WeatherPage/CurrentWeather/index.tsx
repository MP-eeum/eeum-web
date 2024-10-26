import img_sun from "../../../assets/images/img_sun.png";
import img_moon from "../../../assets/images/img_moon.png";
import img_cloud from "../../../assets/images/img_cloud.png";
import img_rain from "../../../assets/images/img_rain.png";
import img_snow from "../../../assets/images/img_snow.png";
import { useEffect, useState } from "react";

interface Item {
  [key: string]: string;
}

interface Props {
  temp: Item;
  sky: Item;
  pty: Item;
}

export default function CurrentWeather({ temp, sky, pty }: Props) {
  const [time, setTime] = useState("");
  const [skyState, setSkyState] = useState("");
  const [ptyValue, setPtyState] = useState("");

  useEffect(() => {
    if (!(temp && sky && pty)) return;
    setTime(sky.fcstTime);
    setSkyState(sky.fcstValue);
    setPtyState(pty.fcstValue);
  }, []);

  const getWeatherIcon = () => {
    if (ptyValue === "1" || skyState === "4") return img_rain;
    else if (ptyValue === "3") return img_snow;
    else if (skyState > "5") return img_cloud;
    else if (time > "6" && time < "18") return img_sun;
    return img_moon;
  };

  if (!(temp && sky && pty)) return <div />;
  return (
    <div className="flex flex-col items-center gap-2 my-8">
      <img className="w-28" alt="img_weather" src={getWeatherIcon()} />
      <div className="text-lg font-semibold">수원시 팔달구</div>
      <div className="text-5xl">{temp.fcstValue}º</div>
    </div>
  );
}

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
}

export default function Hourly({ data }: Props) {
  const pairedData = [];

  for (let i = 0; i < data.length; i += 3) {
    const pair = data.slice(i, i + 3);
    const child = {
      fcstTime: pair[0].fcstTime.slice(0, 2),
      temp: pair[0].fcstValue,
      sky: pair[1].fcstValue,
      pty: pair[2].fcstValue,
    };
    pairedData.push(child);
  }

  const getWeatherIcon = (time: string, sky: string, pty: string) => {
    if (pty === "1" || pty === "4") return icn_rain;
    else if (pty === "3") return icn_snow;
    else if (sky > "5") return icn_cloud;
    else if (time > "6" && time < "18") return icn_sun;
    return icn_moon;
  };

  return (
    <div className="flex w-full gap-1 px-5 py-4 border rounded-lg border-lightgray ">
      {pairedData.map((item, index) => (
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

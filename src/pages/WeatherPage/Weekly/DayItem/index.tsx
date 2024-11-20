import icn_sun from "../../../../assets/icons/icn_sun.svg";
import icn_cloud from "../../../../assets/icons/icn_cloud.svg";
import icn_rain from "../../../../assets/icons/icn_rain.svg";
import icn_snow from "../../../../assets/icons/icn_snow.svg";

interface Item {
  [key: string]: string;
}
interface Props {
  data: Item;
}
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export default function DayItem({ data }: Props) {
  const getWeatherIcon = (value: string) => {
    if (value === "맑음") return icn_sun;
    else if (value === "구름많음" || value === "흐림") return icn_cloud;
    else if (value === "구름많고 눈" || value === "흐리고 눈") return icn_snow;
    else return icn_rain;
  };

  const getDateFunc = (input: string) => {
    const day = new Date();
    day.setDate(day.getDate() + Number(input));
    return `${daysOfWeek[day.getDay()]}요일`;
  };
  return (
    <div className="flex items-center justify-between px-5 border-b h-14 border-lightgray">
      <div>{getDateFunc(data.id)}</div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          {data.id === "0" && <p className="text-xs text-textgray">오전</p>}
          <div className="text-xs">{data.rainAm}%</div>
        </div>
        <img
          className="w-6"
          alt="weather_image"
          src={getWeatherIcon(data.weatherAm)}
        />
        <img
          className="w-6"
          alt="weather_image"
          src={getWeatherIcon(data.weatherPm)}
        />
        <div className="flex flex-col items-center">
          {data.id === "0" && <p className="text-xs text-textgray">오후</p>}
          <div className="text-xs">{data.rainPm}%</div>
        </div>
      </div>
      <div className="flex gap-1">
        <p>{Math.floor(Number(data.tempLow))}º</p>/
        <p>{Math.floor(Number(data.tempHigh))}º</p>
      </div>
    </div>
  );
}

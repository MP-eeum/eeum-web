import { useEffect, useState } from "react";
import { maindata } from "../../../maindata";
import img_sun from "../../../assets/images/img_sun.png";
import img_moon from "../../../assets/images/img_moon.png";
import img_cloud from "../../../assets/images/img_cloud.png";
import img_rain from "../../../assets/images/img_rain.png";
import img_snow from "../../../assets/images/img_snow.png";

export default function Top({
  data,
  weatherData,
  today,
  formatDate,
  current,
  setCurrent,
}: any) {
  const [weather, setWeather] = useState({
    temp: "",
    time: "",
    sky: "",
    pty: "",
    text: "",
    image: "",
  });

  useEffect(() => {
    if (!data || data.length === 0) return;
    setCurrentFunc();
  }, [data]);

  useEffect(() => {
    if (weatherData.length === 0) return;
    setWeatherFunc();
  }, [weatherData]);

  useEffect(() => {
    if (weather.temp === "" || weather.image) return;
    getWeatherIcon();
  }, [weather]);

  const setWeatherFunc = () => {
    const filteredData = weatherData.filter(
      (item: any) =>
        (item.category === "TMP" ||
          item.category === "PTY" ||
          item.category === "SKY") &&
        item.fcstDate === formatDate(today) &&
        item.fcstTime === `${String(today.getHours()).padStart(2, "0")}00`
    );
    setWeather({
      temp: filteredData[0].fcstValue,
      time: filteredData[0].fcstTime,
      sky: filteredData[1].fcstValue,
      pty: filteredData[2].fcstValue,
      text: "",
      image: "",
    });
  };

  const setCurrentFunc = () => {
    const state = data[0].pwn;
    maindata.map((item: any) => {
      if (state.includes(item.id)) setCurrent(item);
    });
  };

  const getWeatherIcon = () => {
    const { time, sky, pty } = weather;
    if (pty === "1" || pty === "4")
      setWeather({ ...weather, text: "비", image: img_rain });
    else if (pty === "3")
      setWeather({ ...weather, text: "눈", image: img_snow });
    else if (sky > "5")
      setWeather({ ...weather, text: "흐림", image: img_cloud });
    else if (Number(time) > 600 && Number(time) < 1800)
      setWeather({ ...weather, text: "맑음", image: img_sun });
    else setWeather({ ...weather, text: "맑음", image: img_moon });
  };

  return (
    <div className="relative flex flex-col text-black">
      <div className="flex items-end">
        <img
          className="z-0 w-full h-96 bg-lightgray"
          alt="weather image"
          src={current.img}
        />
        <div className="absolute z-10 w-full h-96 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.875)] bg-gradient-to-t " />
      </div>
      <div className="absolute z-20 p-8">
        <div className="z-10 text-xs text-textgray mb-[0.15rem]">
          오늘의 재난 예측
        </div>
        <div className="z-10 mb-2 text-xl font-medium">
          {current.title}
          <br />
          <div dangerouslySetInnerHTML={{ __html: current.content }} />
        </div>
        <div className="z-10 flex items-center gap-1">
          <img className="w-8" alt="img_weather" src={weather.image} />
          <div className="ml-[-1.125rem] text-xl font-bold">
            {weather.temp}º
          </div>
          <div className="flex flex-col mb-2 text-xs font-extrabold">
            <div>수원시 팔달구</div>
            <div>{weather.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

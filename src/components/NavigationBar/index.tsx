import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import icn_news from "../../assets/svgs/icn_news.svg";
import icn_news_off from "../../assets/svgs/icn_news_off.svg";
import icn_weather from "../../assets/svgs/icn_weather.svg";
import icn_weather_off from "../../assets/svgs/icn_weather_off.svg";
import icn_home from "../../assets/svgs/icn_home.svg";
import icn_home_off from "../../assets/svgs/icn_home_off.svg";
import icn_emergency from "../../assets/svgs/icn_emergency.svg";
import icn_emergency_off from "../../assets/svgs/icn_emergency_off.svg";
import icn_megaphone from "../../assets/svgs/icn_megaphone.svg";
import icn_megaphone_off from "../../assets/svgs/icn_megaphone_off.svg";

export default function NavigationBar() {
  const buttons = [
    { id: "news", name: "재난뉴스", imageOn: icn_news, imageOff: icn_news_off },
    {
      id: "weather",
      name: "기상정보",
      imageOn: icn_weather,
      imageOff: icn_weather_off,
    },
    { id: "home", name: "홈", imageOn: icn_home, imageOff: icn_home_off },
    {
      id: "disaster",
      name: "긴급상황",
      imageOn: icn_emergency,
      imageOff: icn_emergency_off,
    },
    {
      id: "evacuation",
      name: "대피요령",
      imageOn: icn_megaphone,
      imageOff: icn_megaphone_off,
    },
  ];

  const navigation = useNavigate();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    path !== "" ? setCurrent(path) : setCurrent("home");
  }, []);

  const onClickBtn = (id: string) => {
    setCurrent(id);
    navigation(`/${id !== "home" ? id : ""}`);
  };

  return (
    <div className="fixed bottom-0 z-30 flex items-center justify-around h-20 px-5 bg-white border-t w-96 border-lightgray">
      {buttons.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center w-16 gap-3 cursor-pointer"
          onClick={() => onClickBtn(item.id)}
        >
          <img
            className="w-5 h-5"
            alt={item.name}
            src={current === item.id ? item.imageOn : item.imageOff}
          />
          <div
            className={`text-sm ${current === item.id ? "text-primary" : "text-lightgray"}`}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}

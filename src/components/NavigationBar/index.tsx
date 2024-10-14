import { useState } from "react";
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
    { name: "재난뉴스", imageOn: icn_news, imageOff: icn_news_off },
    { name: "기상정보", imageOn: icn_weather, imageOff: icn_weather_off },
    { name: "홈", imageOn: icn_home, imageOff: icn_home_off },
    { name: "긴급상황", imageOn: icn_emergency, imageOff: icn_emergency_off },
    { name: "대피요령", imageOn: icn_megaphone, imageOff: icn_megaphone_off },
  ];

  const [current, setCurrent] = useState();
  return (
    <div className="w-96 flex justify-around fixed bottom-0 border-t h-20">
      {buttons.map((item) => (
        <div
          key={item.name}
          className="w-16 flex flex-col items-center justify-center gap-1"
        >
          <img
            alt={item.name}
            src={current === item.name ? item.imageOn : item.imageOff}
          />
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
}

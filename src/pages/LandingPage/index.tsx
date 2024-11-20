import { useEffect, useState } from "react";
import axios from "axios";
import { maindata } from "../../maindata";
import icn_btnAI from "../../assets/icons/icn_btnAI.png";
import ItemBox from "./ItemBox";
import Top from "./Top";
import Videos from "./Videos";
import Chatbot from "./Chatbot";

export default function LandingPage() {
  const url = "WthrWrnInfoService/getWthrPwn";
  const url_weather = "VilageFcstInfoService_2.0/getVilageFcst";
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [current, setCurrent] = useState(maindata[0]);
  const [showChat, setShowChat] = useState(false);

  const today = new Date();
  const yesterday = new Date();

  useEffect(() => {
    yesterday.setDate(today.getDate() - 1);
    getWeatherData();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const getWeatherData = async () => {
    const options = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        dataType: "JSON",
        stnId: 108, //전국
      },
    };
    const options1 = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: formatDate(yesterday),
        base_time: "2300",
        nx: 61,
        ny: 121,
      },
    };
    try {
      const res = await axios.get(
        `http://apis.data.go.kr/1360000/${url}`,
        options
      );
      const res1 = await axios.get(
        `http://apis.data.go.kr/1360000/${url_weather}`,
        options1
      );
      setWeatherData(res1.data.response.body.items.item);
      if (!res.data.response.body) return;
      setData(res.data.response.body.items.item);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <Top
        data={data}
        weatherData={weatherData}
        today={today}
        formatDate={formatDate}
        current={current}
        setCurrnet={setCurrent}
      />
      <div className="flex flex-col px-6 py-5 gap-7">
        <ItemBox data={data} />
      </div>
      <div className="mb-12">
        <Videos current={current} />
      </div>
      <div className="fixed z-30 flex justify-end p-3 bottom-20 w-96">
        <img
          className="cursor-pointer"
          src={icn_btnAI}
          onClick={() => setShowChat(true)}
        />
      </div>
      {showChat && (
        <div className="fixed z-50 w-96 h-[95%] bottom-0 animate-slideUp">
          <Chatbot setShowChat={setShowChat} />
        </div>
      )}
    </div>
  );
}

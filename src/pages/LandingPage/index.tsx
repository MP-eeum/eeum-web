import { useEffect, useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { maindata } from "../../maindata";
import icn_btnAI from "../../assets/icons/icn_btnAI.png";
import img_textbox from "../../assets/images/img_textbox.png";
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
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        // fromTmFc: 20241116,
        // ToTmFc: 20241116,
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
      <div className="flex flex-col justify-center px-6 py-5">
        {loading ? (
          <div className="flex items-center justify-center h-36">
            <PulseLoader color="#396951" size="10px" />
          </div>
        ) : (
          <ItemBox data={data} />
        )}
      </div>
      <div className="mb-12">
        <Videos current={current} />
      </div>
      <div className="fixed z-30 flex justify-end p-3 bottom-20 w-96">
        <div className="flex flex-col items-end w-fit">
          {isHovered && (
            <div className="relative w-52">
              <img src={img_textbox} />
              <div className="absolute top-0 flex flex-col gap-1 px-4 py-3">
                <div className="text-sm font-semibold">이음 재난 AI</div>
                <div className="text-xs font-medium">
                  재난 상황에서 발생하는 모든 궁금증에 대해 알아볼 수 있어요.
                </div>
              </div>
            </div>
          )}
          <img
            className="w-16 cursor-pointer"
            src={icn_btnAI}
            onClick={() => setShowChat(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </div>
      {showChat && (
        <div className="fixed z-50 w-96 h-[95%] bottom-0 animate-slideUp">
          <Chatbot setShowChat={setShowChat} />
        </div>
      )}
    </div>
  );
}

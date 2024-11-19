import { useEffect, useState } from "react";
import axios from "axios";
import icn_btnAI from "../../assets/icons/icn_btnAI.png";
import ItemBox from "./ItemBox";
import Top from "./Top";
import Videos from "./Videos";
import Chatbot from "./Chatbot";

export default function LandingPage() {
  const url = "WthrWrnInfoService/getWthrPwn";
  const [data, setData] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    const options = {
      params: {
        serviceKey: process.env.REACT_APP_DECODE,
        dataType: "JSON",
        stnId: 108, //전국
        // fromTmFc: 20241112,
        // toTmFc: 20241112,
      },
    };
    try {
      const res = await axios.get(
        `http://apis.data.go.kr/1360000/${url}`,
        options
      );
      if (!res.data.response.body) return;
      setData(res.data.response.body.items.item);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <Top data={data} />
      <div className="flex flex-col px-6 py-5 gap-7">
        <ItemBox data={data} />
      </div>
      <div className="px-6 mb-12">
        <Videos />
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

import { useEffect, useState } from "react";
import axios from "axios";
import ItemBox from "./ItemBox";
import Top from "./Top";
import Videos from "./Videos";

export default function LandingPage() {
  const url = "WthrWrnInfoService/getWthrPwn";
  const [data, setData] = useState([]);

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
      setData(res.data.response.body.items.item);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Top data={data} />
      <div className="flex flex-col px-6 py-5 gap-7">
        <ItemBox data={data} />
      </div>
      <div className="px-6 mb-12">
        <Videos />
      </div>
    </div>
  );
}

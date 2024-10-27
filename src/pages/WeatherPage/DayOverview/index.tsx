import { useEffect, useState } from "react";

interface Item {
  [key: string]: string;
}
interface Props {
  data: Item[];
  uv: Item[];
  today: Date;
  formatDate: (link: Date) => string;
}

export default function DayOverview({ data, uv, today, formatDate }: Props) {
  const [state, setState] = useState({
    tmx: "",
    tmn: "",
    uv: "",
    rainfall: "",
  });

  const getUVstate = () => {
    if (state.uv < "3") return "낮음";
    else if (state.uv < "6") return "보통";
    else if (state.uv < "8") return "높음";
    else if (state.uv < "11") return "매우높음";
    else return "위험";
  };

  useEffect(() => {
    const filteredData = data.filter(
      (item: Item) =>
        (item.category === "TMN" ||
          item.category === "TMX" ||
          (item.category === "POP" &&
            item.fcstTime === `${today.getHours()}00`)) &&
        item.fcstDate === formatDate(today)
    );
    setState({
      tmn: filteredData.filter((item: Item) => item.category === "TMN")[0]
        .fcstValue,
      tmx: filteredData.filter((item: Item) => item.category === "TMX")[0]
        .fcstValue,
      uv: uv[0][`h${Math.floor(today.getHours() / 3) * 3}`],
      rainfall: filteredData.filter((item: Item) => item.category === "POP")[0]
        .fcstValue,
    });
  }, []);

  return (
    <div className="flex justify-between px-5 py-4 border rounded-lg border-lightgray">
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">최저기온</div>
        {state.tmn}º
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">최고기온</div>
        {state.tmx}º
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">강수확률</div>
        {state.rainfall}%
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">자외선지수</div>
        {state.uv}({getUVstate()})
      </div>
    </div>
  );
}

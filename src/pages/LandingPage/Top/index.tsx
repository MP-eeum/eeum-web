import { useEffect, useState } from "react";
import { maindata } from "../../../maindata";

interface Props {
  data: any[];
}

export default function Top({ data }: Props) {
  const [current, setCurrent] = useState(maindata[0]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const state = data[0].pwn;
    if (state.includes("폭염")) {
      setCurrent(maindata[1]);
      return;
    } else if (state.includes("태풍")) {
      setCurrent(maindata[2]);
      return;
    } else if (state.includes("홍수")) {
      setCurrent(maindata[3]);
      return;
    } else if (state.includes("가뭄")) {
      setCurrent(maindata[4]);
      return;
    } else if (state.includes("황사")) {
      setCurrent(maindata[5]);
      return;
    } else if (state.includes("호우")) {
      setCurrent(maindata[6]);
      return;
    } else if (state.includes("지진")) {
      setCurrent(maindata[7]);
      return;
    } else if (state.includes("폭설")) {
      setCurrent(maindata[8]);
      return;
    } else if (state.includes("산불")) {
      setCurrent(maindata[9]);
      return;
    } else if (state.includes("화재")) {
      setCurrent(maindata[10]);
      return;
    }
  });

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
        <div className="z-10 text-sm  mb-[0.2rem]">수원시 팔달구</div>
        <div className="z-10 flex items-center gap-1">
          <div className="text-3xl">🌨️</div>
          <div className="ml-[-1.125rem] text-xl font-bold">-3º</div>
          <div className="text-xs font-extrabold">
            폭설 <br />
            어제와 같은 기온
          </div>
        </div>
      </div>
    </div>
  );
}

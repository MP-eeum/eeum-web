import { useEffect, useState } from "react";
import icn_snow from "../../../assets/icons/icn_snow.svg";
import icn_back from "../../../assets/icons/icn_back.svg";
import icn_next from "../../../assets/icons/icn_next.svg";

interface Props {
  data: any[];
}

export default function ItemBox({ data }: Props) {
  const [pwn, setPwn] = useState<any[]>([]);
  const today = [
    new Date().toISOString().split("T")[0],
    new Date().toString().split(" ")[4].slice(0, 5),
  ].join(" ");

  useEffect(() => {
    if (data.length === 0) return;
    const result = data.map((item: any) => item.pwn.split("\r\n"));
    if (result.length === 0) return;
    const pairedData = [];
    for (let j = 0; j < result.length; j++) {
      for (let i = 0; i < result[j].length; i += 2) {
        const pair = result[j].slice(i, i + 2);
        const child = {
          title: pair[0].slice(4),
          time: pair[1].split(" : ")[0].slice(2),
          loc: pair[1].split(" : ")[1],
        };
        pairedData.push(child);
      }
    }
    setPwn(pairedData);
  }, [data]);

  if (!pwn) return <div></div>;
  return (
    <div className="flex flex-col">
      <div className="relative flex my-2 border rounded-lg border-lightgray">
        {pwn.length === 0 ? (
          <div className="flex flex-col min-w-full gap-3 px-10 py-5">
            <div className="flex items-center gap-3 bg-white">
              <div className="font-semibold">재난 속보</div>|
              <div className="text-sm text-textgray">{today} 기준</div>
            </div>
            <div className="flex items-center gap-3 text-sm text-center">
              현재 시각까지 보고된 재난 소식은 없습니다.
              <br /> 안전에 유의하시고 편안한 하루 보내세요.
            </div>
          </div>
        ) : (
          <>
            {pwn.map((item, index) => (
              <div
                key={index}
                className="flex flex-col min-w-full gap-3 px-10 py-5"
              >
                <div className="flex items-center gap-3 bg-white">
                  <div className="font-semibold">재난 속보</div>|
                  <div className="text-sm text-textgray">{item.time}</div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <img className="w-16" alt="weather-image" src={icn_snow} />
                  <div className="flex flex-col">
                    <div>{item.title}</div>
                    <div className="text-textgray">{item.loc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute flex items-center justify-between w-full h-full px-1">
              <img className="cursor-pointer" src={icn_back} />
              <img className="cursor-pointer" src={icn_next} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

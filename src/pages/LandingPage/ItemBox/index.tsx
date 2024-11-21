import { useEffect, useState } from "react";
import icn_itembox_sun from "../../../assets/icons/icn_itembox_sun.svg";
import icn_itembox_rain from "../../../assets/icons/icn_itembox_rain.svg";
import icn_itembox_snow from "../../../assets/icons/icn_itembox_snow.svg";
import icn_itembox_default from "../../../assets/icons/icn_itembox_default.svg";

import icn_back from "../../../assets/icons/icn_back.svg";
import icn_next from "../../../assets/icons/icn_next.svg";

interface Props {
  data: any[];
}

export default function ItemBox({ data }: Props) {
  const [pwn, setPwn] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const today = [
    new Date().toISOString().split("T")[0],
    new Date().toString().split(" ")[4].slice(0, 5),
  ].join(" ");

  useEffect(() => {
    if (data.length === 0) return;
    const result: any[] = [];
    let currentCategory = "";
    let currentGroup: any[] = [];

    data[0].pwn.split("\r\n").forEach((item: any) => {
      const match = item.match(/^\((\d+)\)/);
      if (match) {
        if (currentGroup.length > 0) {
          result.push({ category: currentCategory, items: currentGroup });
        }
        currentCategory = item.slice(4);
        currentGroup = [];
      } else {
        currentGroup.push(item);
      }
    });
    if (currentGroup.length > 0) {
      result.push({ category: currentCategory, items: currentGroup });
    }

    if (result.length === 0) return;
    // const pairedData = [];
    // for (let j = 0; j < result.length; j++) {
    //   for (let i = 0; i < result[j].length; i += 2) {
    //     const pair = result[j].slice(i, i + 2);
    //     const child = {
    //       title: pair[0].slice(4),
    //       time: pair[1].split(" : ")[0].slice(2),
    //       loc: pair[1].split(" : ")[1],
    //     };
    //     pairedData.push(child);
    //   }
    // }
    // setPwn(pairedData);
    const formattedData: any[] = [];
    result.forEach((category) => {
      category.items.map((item: any) => {
        const child = {
          title: category.category,
          time: item.split(" : ")[0].slice(2),
          loc: item.split(" : ")[1],
        };
        formattedData.push(child);
      });
    });
    setPwn(formattedData);
  }, [data]);

  const formatData = (input: string) => {
    if (input.length < 30) return input;
    return input.slice(0, 30) + "...";
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  const getWeatherIcon = (value: string) => {
    if (value.includes("폭염")) return icn_itembox_sun;
    else if (
      value.includes("폭우") ||
      value.includes("호우") ||
      value.includes("장마") ||
      value.includes("태풍")
    )
      return icn_itembox_rain;
    else if (value.includes("폭설") || value.includes("대설"))
      return icn_itembox_snow;
    else return icn_itembox_default;
  };

  if (!pwn) return <div></div>;
  return (
    <div className="flex flex-col">
      <div className="relative flex my-2 border rounded-2xl border-lightgray">
        {pwn.length === 0 ? (
          <div className="flex flex-col min-w-full gap-3 px-10 py-5">
            <div className="flex items-center gap-3 bg-white">
              <div className="font-semibold">재난 속보</div>
              <span style={{ color: "#BFBFBF" }}>|</span>
              <div className="text-sm text-textgray">{today} 기준</div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              현재 시각까지 보고된 재난 소식은 없습니다.
              <br /> 안전에 유의하시고 편안한 하루 보내세요.
            </div>
          </div>
        ) : (
          <>
            <div
              className={`flex flex-col justify-center min-w-full gap-3 px-8 py-5 min-h-36 ${isClicked && "animate-opacity"}`}
            >
              <div className="flex items-center gap-3 bg-white">
                <div className="font-semibold">재난 속보</div>
                <span style={{ color: "#BFBFBF" }}>|</span>
                <div className="text-sm text-textgray">{pwn[current].time}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <img
                  className="min-w-16"
                  alt="weather-image"
                  src={getWeatherIcon(pwn[current].title)}
                />
                <div className="flex flex-col max-w-3xl">
                  <div className="font-semibold">{pwn[current].title}</div>
                  <div className="text-textgray">
                    {formatData(pwn[current].loc)}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center justify-between w-full h-full px-1">
              <div>
                <img
                  className={`cursor-pointer ${current === 0 && "hidden"}`}
                  src={icn_back}
                  onClick={() => {
                    setCurrent(current - 1);
                    handleClick();
                  }}
                />
              </div>
              <div>
                <img
                  className={`cursor-pointer ${current === pwn.length - 1 && "hidden"}`}
                  src={icn_next}
                  onClick={() => {
                    setCurrent(current + 1);
                    handleClick();
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

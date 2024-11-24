import { useState } from "react";
import icn_back_white from "../../../assets/icons/icn_back_white.svg";
import icn_next_white from "../../../assets/icons/icn_next_white.svg";

interface Item {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}

interface Props {
  data: Item[];
  formatText: (link: string) => string;
  formatDate: (link: string) => string;
  funcSetDetail: (link: Item) => void;
}

export default function Urgent({
  data,
  formatText,
  formatDate,
  funcSetDetail,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  return (
    <div className="flex flex-col mx-8">
      <div className="mb-4 font-semibold ">긴급 속보</div>
      <div className="flex items-center w-full">
        {data.length > 0 ? (
          <div className="relative flex items-center w-full px-10 text-white h-28 rounded-3xl bg-primary">
            <div
              className={`z-10 flex flex-col gap-2 cursor-pointer ${isClicked && "animate-opacity"}`}
              onClick={() => funcSetDetail(data[current])}
            >
              <div className="font-bold text-[0.9rem]">
                {formatText(data[current].title)}
              </div>
              <div className="text-sm">{formatDate(data[current].pubDate)}</div>
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full px-3">
              <div>
                <img
                  className={`cursor-pointer ${current === 0 && "hidden"}`}
                  src={icn_back_white}
                  onClick={() => {
                    setCurrent(current - 1);
                    handleClick();
                  }}
                />
              </div>
              <div>
                <img
                  className={`cursor-pointer ${current === data.length - 1 && "hidden"}`}
                  src={icn_next_white}
                  onClick={() => {
                    setCurrent(current + 1);
                    handleClick();
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="flex items-center justify-center w-full font-bold text-center bg-white border-2 h-28 rounded-3xl border-primary text-primary">
            긴급 속보가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}

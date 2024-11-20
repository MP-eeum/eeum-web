import { useEffect, useState } from "react";
import icn_info from "../../../assets/icons/icn_info.svg";

interface Item {
  [key: string]: string;
}
interface Props {
  data: Item[];
  today: Date;
}

export default function AirCondition({ data, today }: Props) {
  const [state, setState] = useState<string>();
  const [showInfo, setShowInfo] = useState(false);

  const getAirState = (input: number) => {
    if (input < 26) return "낮음";
    else if (input < 51) return "보통";
    else if (input < 76) return "높음";
    else return "매우높음";
  };

  useEffect(() => {
    if (data.length === 0) return;
    setState(data[0][`h${Math.floor(today.getHours() / 3) * 3}`]);
  }, []);

  const getConditionBar = () => {
    if (!state) return;
    return (
      <div className="relative w-full h-4 rounded-xl bg-lightgray">
        <div
          className={`absolute w-[${Number(state)}%] h-4 z-30 rounded-xl bg-primary`}
        >
          <div className="absolute right-0 w-4 h-4 border-2 border-white bg-none rounded-xl" />
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-3 px-5 py-4 border rounded-lg border-lightgray">
      <div className="flex flex-col font-semibold">
        <div className="flex items-center gap-2">
          <div>
            대기정체지수 {state} ({getAirState(Number(state))})
          </div>
          <img
            className="w-4 opacity-50 cursor-pointer"
            src={icn_info}
            onClick={() => setShowInfo(!showInfo)}
          />
        </div>
      </div>
      {getConditionBar()}
      {showInfo && (
        <div className="absolute z-50 px-12 top-12">
          <div className="flex flex-col w-64 p-4 text-sm bg-white border rounded-md shadow-lg border-lightgray">
            <div className="font-medium">대기정체지수</div>
            <div className="text-xs font-normal text-textgray">
              대기 상태에 의해 대기가 정체될 수 있는 가능성을 지수로 나타낸
              것입니다. 미세먼지 지표와 함께 외부 활동을 결정할 때 활용할 수
              있습니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

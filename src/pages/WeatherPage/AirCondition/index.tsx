import { useEffect, useState } from "react";

interface Item {
  [key: string]: string;
}
interface Props {
  data: Item[];
  today: Date;
}

export default function AirCondition({ data, today }: Props) {
  const [state, setState] = useState<string>();

  const getAirState = (input: number) => {
    if (input < 26) return "낮음";
    else if (input < 51) return "보통";
    else if (input < 76) return "높음";
    else return "매우높음";
  };

  useEffect(() => {
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
    <div className="flex flex-col gap-3 px-5 py-4 border rounded-lg border-lightgray">
      <div className="flex flex-col font-semibold">
        대기정체지수 {state} ({getAirState(Number(state))})
      </div>
      {getConditionBar()}
    </div>
  );
}

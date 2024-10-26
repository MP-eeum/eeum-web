interface Props {
  data: number;
}

export default function AirCondition({ data }: Props) {
  const getAirState = () => {
    if (data < 26) return "낮음";
    else if (data < 51) return "보통";
    else if (data < 76) return "높음";
    else return "매우높음";
  };

  return (
    <div className="flex flex-col gap-3 px-5 py-4 border rounded-lg border-lightgray">
      <div className="flex flex-col font-semibold">
        대기정체지수 {data} ({getAirState()})
      </div>
      <div className="relative w-full h-4 rounded-xl bg-lightgray">
        <div className={`absolute w-[${data}%] h-4 rounded-xl bg-primary`}>
          <div className="absolute right-0 w-4 h-4 border-2 border-white bg-none rounded-xl" />
        </div>
      </div>
    </div>
  );
}

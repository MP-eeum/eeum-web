interface ItemOverview {
  lowest: number;
  highest: number;
  uv: number;
  rainfall: number;
}

interface Props {
  data: ItemOverview;
}

export default function DayOverview({ data }: Props) {
  const getUVstate = () => {
    if (data.uv < 3) return "낮음";
    else if (data.uv < 6) return "보통";
    else if (data.uv < 8) return "높음";
    else if (data.uv < 11) return "매우높음";
    else return "위험";
  };

  return (
    <div className="flex justify-between px-5 py-4 border rounded-lg border-lightgray">
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">최저온도</div>
        {data.lowest}º
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">최고온도</div>
        {data.highest}º
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">강수확률</div>
        {data.rainfall}%
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">자외선지수</div>
        {data.uv}({getUVstate()})
      </div>
    </div>
  );
}

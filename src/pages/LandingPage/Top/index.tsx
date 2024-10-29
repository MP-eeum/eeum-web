import { maindata } from "../../../maindata";

export default function Top() {
  const current = maindata[1];
  return (
    <div className="relative flex flex-col text-black">
      <div className="flex items-end">
        <img
          className="z-0 w-full h-96"
          alt="weather image"
          src={current.img}
        />
        <div className="absolute z-10 w-full h-96 from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.875)] bg-gradient-to-t " />
      </div>
      <div className="absolute z-20 p-8">
        <div className="z-10 text-xs text-black02 mb-[0.15rem]">
          오늘의 재난 예측
        </div>
        <div className="z-10 mb-2 text-xl font-medium">
          {current.title}
          <br />
          <div dangerouslySetInnerHTML={{ __html: current.content }} />
        </div>
        <div className="z-10 text-sm  mb-[0.2rem]">수원시 권선구</div>
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

import img_main_snowy from "../../assets/test/img_snowy.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="relative flex flex-col p-8 text-black">
        <img
          className="absolute top-0 left-0 z-0 w-full"
          alt="weather image"
          src={img_main_snowy}
        />
        <div className="z-10 text-xs text-black02 mb-[0.15rem]">
          오늘의 재난 예측
        </div>
        <div className="z-10 mb-2 text-xl font-medium">
          폭설 주의보 발효 예정
          <br />
          외출시 도로와 주변 환경에 유의하세요.
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

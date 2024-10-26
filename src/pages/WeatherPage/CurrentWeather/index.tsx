import img_snow from "../../../assets/images/img_snow.png";

export default function CurrentWeather() {
  return (
    <div className="flex flex-col items-center gap-2 my-8">
      <img className="w-28" alt="img_weather" src={img_snow} />
      <div className="text-lg font-semibold">수원시 팔달구</div>
      <div className="text-5xl">-3º</div>
    </div>
  );
}

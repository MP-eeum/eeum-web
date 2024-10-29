import icn_snow from "../../../assets/svgs/icn_snow.svg";

export default function ItemBox() {
  const mockdata = [
    {
      type: "재난속보",
      time: "2024-02-16",
      image: icn_snow,
      title: "대설 주의보 강설량 15~20cm",
      loc: ["강원도 강릉시", "강원도 평창시"],
    },
    {
      type: "재난속보",
      time: "2024-02-16",
      image: icn_snow,
      title: "대설 주의보 강설량 15~20cm",
      loc: ["강원도 강릉시", "강원도 평창시"],
    },
  ];
  return (
    <div className="flex border rounded-lg border-lightgray">
      {mockdata.map((item, index) => (
        <div key={index} className="flex flex-col min-w-full gap-3 px-5 py-4 ">
          <div className="flex gap-3 px-4">
            <div>재난속보</div>|<div>2024-02-16 13:00</div>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-16" alt="weather-image" src={item.image} />
            <div className="flex flex-col">
              <div>{item.title}</div>
              <div className="flex gap-1 text-sm">
                {item.loc.map((i) => (
                  <div key={i}>{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

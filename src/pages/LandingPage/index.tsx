import ItemBox from "./ItemBox";
import Top from "./Top";
import Videos from "./Videos";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <Top />
      <div className="flex flex-col px-6 py-5 gap-7">
        <ItemBox />
        <ItemBox />
      </div>
      <div className="px-6 mb-12">
        <Videos />
      </div>
    </div>
  );
}

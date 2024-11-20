import icn_more from "../../../assets/icons/icn_more.svg";
import VideoItem from "./VideoItem";
import { videodata } from "../../../maindata";

export default function Videos() {
  const moreVideosUrl = "https://www.safetv.go.kr/base/main/view";
  return (
    <div>
      <div className="flex items-center justify-between w-full pb-4">
        <div className="font-semibold">AI 맞춤 안전 영상</div>
        <div
          className="flex items-center text-xs cursor-pointer text-textgray w-fit"
          onClick={() =>
            window.open(moreVideosUrl, "_blank", "noopener,noreferrer")
          }
        >
          <div className="text-nowrap font-semibold">영상 더보기</div>
          <img src={icn_more} />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
       <div className="flex gap-5 p-2">
         {videodata.map((item: any) => (
           <VideoItem key={item.title} data={item} />
         ))}
       </div>
     </div>
    </div>
  );
}

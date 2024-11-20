import { videodata } from "../../../maindata";
import icn_more from "../../../assets/icons/icn_more.svg";
import VideoItem from "./VideoItem";

export default function Videos({ current }: any) {
  const moreVideosUrl = "https://www.safetv.go.kr/base/main/view";
  return (
    <div>
      <div className="flex items-center justify-between w-full px-6 pb-4">
        <div className="font-semibold">AI 맞춤 안전 영상</div>
        <div
          className="flex items-center text-xs cursor-pointer text-textgray w-fit"
          onClick={() =>
            window.open(moreVideosUrl, "_blank", "noopener,noreferrer")
          }
        >
          <div className="text-xs font-medium text-nowrap">영상 더보기</div>
          <img className="w-5" src={icn_more} />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-6 py-2 w-fit">
          {videodata.map(
            (item: any) =>
              item.id.includes(current.id) && (
                <VideoItem key={item.content} data={item} />
              )
          )}
        </div>
      </div>
    </div>
  );
}

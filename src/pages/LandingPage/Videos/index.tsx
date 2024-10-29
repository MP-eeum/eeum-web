import VideoItem from "./VideoItem";
import { videodata } from "../../../maindata";

export default function Videos() {
  return (
    <div>
      <div className="pb-4 font-semibold">안전 영상</div>
      <div className="flex w-full gap-5">
        {videodata.map((item: any) => (
          <VideoItem key={item.title} data={item} />
        ))}
      </div>
    </div>
  );
}

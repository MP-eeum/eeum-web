interface Item {
  img: string;
  title: string;
  content: string;
  url: string;
}
interface Props {
  data: Item;
}

export default function VideoItem({ data }: Props) {
  return (
    <div
      className="flex flex-col gap-2 p-4 text-sm rounded-xl shadow-[0_0_15px_1px_rgba(0,0,0,0.08)] cursor-pointer"
      onClick={() => window.open(data.url, "_blank", "noopener,noreferrer")}
    >
      <img
        className="h-32 rounded-2xl min-w-44 bg-lightgray"
        alt="안전영상 이미지"
        src={data.img}
      />
      <div className="font-semibold">{data.title}</div>
      <div>{data.content}</div>
    </div>
  );
}

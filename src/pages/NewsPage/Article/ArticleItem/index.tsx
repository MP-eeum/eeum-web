interface Props {
  title: string;
  pubDate: string;
}

export default function ArticleItem({ title, pubDate }: Props) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-between gap-2 py-3 border-b cursor-pointer border-lightgray">
      <div className="flex flex-col">
        <div className="flex-1 text-sm font-medium">{title}</div>
        <div className="flex gap-1 text-xs">
          <p>작성일:</p>
          {pubDate}
        </div>
      </div>
      <div className="flex justify-end text-white w-fit">
        {today === pubDate && (
          <div className="px-2 text-xs bg-primary rounded-xl">NEW</div>
        )}
      </div>
    </div>
  );
}

interface Props {
  title: string;
  pubDate: string;
}

export default function ArticleItem({ title, pubDate }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const formatTitle = (input: string, isNew: boolean) => {
    if (isNew) return input.length > 22 ? input.slice(0, 22) + " ···" : input;
    return input.length > 30 ? input.slice(0, 30) + " ···" : input;
  };

  return (
    <div className="flex justify-between py-3 border-b cursor-pointer border-[#E7E8E8]">
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between w-full">
          <div className="flex-1 text-sm font-semibold">
            {formatTitle(title, today === pubDate)}
          </div>
          <div className="flex justify-end text-white w-fit">
            {today === pubDate && (
              <div className="w-12 h-4 text-xs text-center bg-primary rounded-xl">
                NEW
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1 text-sm text-textgray">
          <p>작성일:</p>
          {pubDate}
        </div>
      </div>
    </div>
  );
}

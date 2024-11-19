import icn_back from "../../../assets/icons/icn_back.svg";

interface Item {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}

interface Props {
  data: Item;
  funcSetDetail: (link: Item) => void;
}
export default function Detail({ data, funcSetDetail }: Props) {
  const { title, description, link, originallink, pubDate } = data;

  const formatText = (input: string) => {
    return input
      .replace(/&quot;/g, '"')
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "");
  };

  const formatDate = (input: string) => {
    const date = new Date(input);
    return date.toISOString().split(".")[0].replace(/T/g, " ");
  };

  return (
    <div className="flex flex-col gap-5 mx-8 text-sm">
      <div>
        <img
          className="cursor-pointer mx-[-0.5rem]"
          alt="<"
          src={icn_back}
          onClick={() => funcSetDetail(data)}
        />
      </div>
      <div className="flex flex-col gap-1 pb-4 border-b border-lightgray">
        <div className="text-base font-bold">{formatText(title)}</div>
        <div>날짜: {formatDate(pubDate)}</div>
      </div>
      <div>{formatText(description)}</div>
      <div
        className="underline cursor-pointer text-primary"
        onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
      >
        본문 보러가기
      </div>
    </div>
  );
}

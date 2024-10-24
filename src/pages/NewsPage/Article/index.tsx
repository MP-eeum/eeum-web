import ArticleItem from "./ArticleItem";

interface Item {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}

interface Props {
  data: Item[];
  formatText: (link: string) => string;
  formatDate: (link: string) => string;
  funcSetDetail: (link: Item) => void;
}
export default function Article({
  data,
  formatText,
  formatDate,
  funcSetDetail,
}: Props) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mx-8">
      <div>뉴스 살펴보기</div>
      <div className="flex flex-col ">
        {data.map((item: any) => (
          <div key={item.link} onClick={() => funcSetDetail(item)}>
            <ArticleItem
              title={formatText(item.title)}
              pubDate={formatDate(item.pubDate)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

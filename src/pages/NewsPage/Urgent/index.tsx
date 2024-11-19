import UrgentItem from "./UrgentItem";

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
export default function Urgent({
  data,
  formatText,
  formatDate,
  funcSetDetail,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="mx-8">긴급 속보</div>
      <div className="flex items-center w-full gap-6 ml-8 overflow-x-auto">
        {data ? (
          data.map((item: any) => (
            <div key={item.link} onClick={() => funcSetDetail(item)}>
              <UrgentItem
                key={item.link}
                title={formatText(item.title)}
                pubDate={formatDate(item.pubDate)}
              />
            </div>
          ))
        ) : (
          <p className="w-full text-center">현재 속보가 없습니다</p>
        )}
      </div>
    </div>
  );
}

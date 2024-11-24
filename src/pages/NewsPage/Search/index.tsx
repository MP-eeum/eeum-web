import { useState } from "react";
import icn_back from "../../../assets/icons/icn_back.svg";
import icn_search from "../../../assets/icons/icn_search.svg";
import icn_alert from "../../../assets/icons/icn_alert.svg";
import ArticleItem from "../Article/ArticleItem";

interface Item {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}

interface Props {
  data: any;
  formatText: (link: string) => string;
  formatDate: (link: string) => string;
  funcSetDetail: (link: Item) => void;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Search({
  data,
  formatText,
  formatDate,
  funcSetDetail,
  setShowSearch,
}: Props) {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(input);
      setFilteredData(
        data.filter(
          (item: Item) =>
            item.title.includes(input) || item.description.includes(input)
        )
      );
      setInput("");
    }
  };

  return (
    <div className="flex flex-col w-full mt-3">
      <div className="flex justify-center gap-2 px-6 itmes-center">
        <img
          className="cursor-pointer"
          src={icn_back}
          onClick={() => setShowSearch(false)}
        />
        <div className="flex w-full gap-1 px-3 py-1 mr-2 border border-primary rounded-3xl">
          <img className="w-4" src={icn_search} />
          <input
            className="w-full mr-2 text-sm outline-none placeholder:text-[#c3c3c3]"
            placeholder="검색어를 입력해 주세요."
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {keyword !== "" && (
        <div className="flex text-sm border-b border-[#C3C3C3] mx-8 mt-5 pb-2 font-medium">
          <p className="mr-1 text-primary">'{keyword}'</p> 검색 결과
          <p className="ml-1 text-primary">{filteredData.length}</p>건
        </div>
      )}
      {filteredData.length > 0 && (
        <div className="flex flex-col mx-8">
          {filteredData.map((item: any) => (
            <div
              key={item.link}
              onClick={() => {
                funcSetDetail(item);
              }}
            >
              <ArticleItem
                title={formatText(item.title)}
                pubDate={formatDate(item.pubDate)}
              />
            </div>
          ))}
        </div>
      )}{" "}
      {keyword !== "" && filteredData.length === 0 && (
        <div className="flex flex-col items-center my-52">
          <img src={icn_alert} />
          <div className="my-3">검색 결과가 없습니다.</div>
          <div className="text-xs text-[#8C8C8C] mb-1">
            단어의 철자가 정확한 지 확인해 주세요.
          </div>
          <div className="text-xs text-[#8C8C8C]">
            검색어의 단어 수를 줄이거나 다른 검색어를 사용해 주세요.
          </div>
        </div>
      )}
    </div>
  );
}

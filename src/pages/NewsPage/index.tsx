import { useEffect, useState } from "react";
import axios from "axios";
import icn_search from "../../assets/svgs/icn_search.svg";
import Header from "../../components/Header";
import Article from "./Article";
import Urgent from "./Urgent";

interface Item {
  title: any;
  [key: string]: any;
}

export default function NewsPage() {
  const [data, setData] = useState<Item[]>([]);
  const [urgent, setUrgent] = useState<Item[]>([]);
  const [articles, setArticles] = useState<Item[]>([]);

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    setUrgent(
      data
        .filter((item) => item.title.includes("[속보]"))
        .map((item) => ({
          ...item,
          title: item.title.replace(/^\[속보\]\s*/, ""),
        }))
    );
    setArticles(data.filter((item) => !item.title.includes("[속보]")));
  }, [data]);

  const getNewsData = async () => {
    const url = "/api/v1/search/news.json";
    const options = {
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
      params: {
        query: "재난 주의보",
        display: 100,
      },
    };

    const res = await axios.get(url, options);
    setData(res.data.items);
  };

  const formatText = (input: string) => {
    const transformed = input
      .replace(/&quot;/g, '"')
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "");

    return transformed.length > 22
      ? transformed.slice(0, 22) + " ···"
      : transformed;
  };

  const formatDate = (input: string) => {
    const date = new Date(input);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-col">
      <div className="h-12">
        <Header
          title="재난뉴스"
          button={
            <img
              className="w-6 h-6 cursor-pointer"
              alt="search"
              src={icn_search}
            />
          }
        />
      </div>
      <div className="flex flex-col gap-5 py-4">
        <div className="mx-8">긴급 속보</div>
        <div className="flex items-center w-full gap-6 ml-8 overflow-x-auto">
          {urgent.length > 0 ? (
            urgent.map((item: any) => (
              <Urgent
                key={item.link}
                title={formatText(item.title)}
                link={item.link}
                pubDate={formatDate(item.pubDate)}
              />
            ))
          ) : (
            <p className="w-full text-center">현재 속보가 없습니다</p>
          )}
        </div>
        <div className="flex justify-between mx-8">
          <div>뉴스 살펴보기</div> <div>등록순</div>
        </div>
        <div className="flex flex-col mx-8">
          {articles.length > 0 &&
            articles.map((item: any) => (
              <Article
                key={item.link}
                title={formatText(item.title)}
                link={item.link}
                pubDate={formatDate(item.pubDate)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

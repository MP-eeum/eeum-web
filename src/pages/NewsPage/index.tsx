import { useEffect, useState } from "react";
import axios from "axios";
import icn_search from "../../assets/icons/icn_search.svg";
import Header from "../../components/Header";
import Article from "./Article";
import Urgent from "./Urgent";
import Detail from "./Detail";

interface Item {
  title: string;
  description: string;
  link: string;
  originallink: string;
  pubDate: string;
}

export default function NewsPage() {
  const [data, setData] = useState<Item[]>([]);
  const [urgents, setUrgents] = useState<Item[]>();
  const [articles, setArticles] = useState<Item[]>([]);
  const [detail, setDetail] = useState<Item>();
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    setUrgents(
      data.filter(
        (item) => item.title.includes("속보") || item.title.includes("긴급")
      )
      // .map((item) => ({
      //   ...item,
      //   title: item.title.replace(/^\[속보\]\s*/, ""),
      // }))
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

  const funcSetDetail = (input: Item) => {
    setShowDetail(!showDetail);
    setDetail(input);
  };

  return (
    <div className="flex flex-col">
      <div className="h-12">
        <Header
          title="재난뉴스"
          button={
            // showDetail ? null : (
            //   <img
            //     className="w-6 h-6 cursor-pointer"
            //     alt="search"
            //     src={icn_search}
            //   />
            // )
            null
          }
        />
      </div>
      {showDetail && detail ? (
        <Detail data={detail} funcSetDetail={funcSetDetail} />
      ) : (
        <div className="flex flex-col gap-5 py-4">
          {urgents && (
            <Urgent
              data={urgents}
              formatText={formatText}
              formatDate={formatDate}
              funcSetDetail={funcSetDetail}
            />
          )}
          {articles && (
            <Article
              data={articles}
              formatText={formatText}
              formatDate={formatDate}
              funcSetDetail={funcSetDetail}
            />
          )}
        </div>
      )}
    </div>
  );
}

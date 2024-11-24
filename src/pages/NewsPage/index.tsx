import { useEffect, useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import icn_search from "../../assets/icons/icn_search.svg";
import Header from "../../components/Header";
import Article from "./Article";
import Urgent from "./Urgent";
import Detail from "./Detail";
import Search from "./Search";

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
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    setUrgents(
      data.filter(
        (item) => item.title.includes("속보") || item.title.includes("긴급")
      )
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
    setLoading(true);
    try {
      const res = await axios.get(url, options);
      setData(res.data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const formatText = (input: string) => {
    const transformed = input
      .replace(/&quot;/g, '"')
      .replace(/<b>/g, "")
      .replace(/<\/b>/g, "");

    return transformed;
  };

  const formatDate = (input: string) => {
    const date = new Date(input);
    return date.toISOString().split("T")[0];
  };

  const funcSetDetail = (input: Item) => {
    setShowDetail(!showDetail);
    setDetail(input);
  };

  if (loading)
    return (
      <div className="flex flex-col w-full h-full">
        <div className="h-12">
          <Header title="재난뉴스" button={null} />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <PulseLoader color="#396951" size="10px" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="h-12">
        <Header
          title="재난뉴스"
          button={
            showDetail ? null : (
              <img
                className="w-6 h-6 cursor-pointer"
                alt="search"
                src={icn_search}
                onClick={() => setShowSearch(true)}
              />
            )
          }
        />
      </div>
      {showSearch && (
        <Search
          data={articles}
          setShowSearch={setShowSearch}
          formatText={formatText}
          formatDate={formatDate}
          funcSetDetail={funcSetDetail}
        />
      )}
      {showDetail && detail && (
        <div className="fixed h-full bg-white w-96 top-12">
          <Detail data={detail} setShowDetail={setShowDetail} />
        </div>
      )}
      {!showSearch && (!showDetail || !detail) && (
        <div className="flex flex-col py-4 gap-11">
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

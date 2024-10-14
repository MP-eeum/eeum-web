import axios from "axios";
import icn_search from "../../assets/svgs/icn_search.svg";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Article from "./Article";

export default function NewsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNewsData();
  }, []);

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
        display: 20,
      },
    };

    const res = await axios.get(url, options);
    setData(res.data.items);
  };

  return (
    <div className="flex flex-col w-full">
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
      <div className="flex flex-col gap-5 py-4 mx-8">
        <div>긴급 속보</div>
        <div className="w-44 h-28 rounded-2xl bg-primary" />
        <div className="flex justify-between">
          <div>뉴스 살펴보기</div> <div>등록순</div>
        </div>
        <div className="flex flex-col">
          {data.length > 0 &&
            data.map((item: any) => (
              <Article
                key={item.link}
                title={item.title}
                link={item.link}
                pubDate={item.pubDate}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

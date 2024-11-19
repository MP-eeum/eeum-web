import React from "react";

interface DisasterItem {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

export default function Behaviors() {
  const naturalDisasters: DisasterItem[] = [
    {
      id: "heat",
      title: "폭염",
      imageUrl: "/icon/1.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=983&searchCategory=",
    },
    {
      id: "typhoon",
      title: "태풍",
      imageUrl: "/icon/2.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=2329&searchCategory=",
    },
    {
      id: "wind",
      title: "강풍",
      imageUrl: "/icon/3.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=561&searchCategory=",
    },
    {
      id: "wavehigh",
      title: "풍랑",
      imageUrl: "/icon/4.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&bidx=826&searchCategory=",
    },
    {
      id: "flod",
      title: "홍수",
      imageUrl: "/icon/5.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=1784&searchCategory=",
    },
    {
      id: "drought",
      title: "가뭄",
      imageUrl: "/icon/6.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=1217&searchCategory=",
    },
    {
      id: "yellowdust",
      title: "황사",
      imageUrl: "/icon/7.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=1781&searchCategory=",
    },
    {
      id: "rainfall",
      title: "호우",
      imageUrl: "/icon/8.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=914&searchCategory=",
    },
    {
      id: "flooding",
      title: "침수",
      imageUrl: "/icon/9.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=1414&searchCategory=",
    },
    {
      id: "riverflood",
      title: "하천강우",
      imageUrl: "/icon/10.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=2615&searchCategory=",
    },
    {
      id: "landslide",
      title: "산사태",
      imageUrl: "/icon/11.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=2617&searchCategory=",
    },
    {
      id: "earthquake",
      title: "지진",
      imageUrl: "/icon/12.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=915&searchCategory=",
    },
    {
      id: "redtide",
      title: "적조",
      imageUrl: "/icon/15.png",
      link: "/redtide-behavior",
    },
  ];

  const socialDisasters: DisasterItem[] = [
    {
      id: "wildfire",
      title: "산불",
      imageUrl: "/icon/16.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=211&searchCategory=",
    },
    {
      id: "fire",
      title: "화재",
      imageUrl: "/icon/17.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=920&searchCategory=",
    },
    {
      id: "dust",
      title: "미세먼지",
      imageUrl: "/icon/18.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=473&searchCategory=",
    },
    {
      id: "livestock",
      title: "가축전염병",
      imageUrl: "/icon/19.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=2224&searchCategory=",
    },
    {
      id: "gas",
      title: "가스",
      imageUrl: "/icon/20.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=2129&searchCategory=",
    },
    {
      id: "infection",
      title: "감염병",
      imageUrl: "/icon/21.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=919&searchCategory=",
    },
    {
      id: "caraccident",
      title: "교통사고",
      imageUrl: "/icon/22.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=527&searchCategory=",
    },
    {
      id: "tunnel",
      title: "도로터널사고",
      imageUrl: "/icon/23.png",
      link: "https://www.safetv.go.kr/base/video/view?playlistManagementIdx=&idx=526&searchCategory=",
    },
  ];

  const DisasterItem = ({ item }: { item: DisasterItem }) => (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center transition-opacity hover:opacity-80"
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-50">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-contain w-14 h-14"
        />
      </div>
      <span className="text-xs text-gray-900">{item.title}</span>
    </a>
  );

  return (
    <div className="w-10/12 mx-auto mb-8 bg-white">
      <div className="px-1 py-4">
        <h2 className="text-base mb-4 px-0.5">자연재난</h2>
        <div className="grid grid-cols-4 gap-x-1 gap-y-6">
          {naturalDisasters.map((item) => (
            <DisasterItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="px-1 py-4">
        <h2 className="text-base mb-4 px-0.5">사회재난</h2>
        <div className="grid grid-cols-4 gap-x-1 gap-y-6">
          {socialDisasters.map((item) => (
            <DisasterItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

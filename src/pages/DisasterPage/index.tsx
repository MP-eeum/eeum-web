import { useEffect, useRef, useState } from "react";
import axios from "axios";
import icn_redcross from "../../assets/icons/icn_redcross.svg";
import icn_shelter from "../../assets/icons/icn_shelter.png";
import icn_currentLoc from "../../assets/icons/icn_currentLoc.svg";
import icn_marker from "../../assets/icons/icn_marker.svg";
import Header from "../../components/Header";
import CustomMarker from "./CustomMarker";

const options = {
  params: {
    serviceKey: process.env.REACT_APP_SHELTER,
    numOfRows: 100,
    pageNo: 1,
    returnType: "json",
    startLot: "127.04",
    endLot: "127.05",
    startLat: "37.268",
    endLat: "37.288",
  },
};

export default function DisasterPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  let map: naver.maps.Map;

  const [currentLoc, setCurrentLoc] = useState({ x: 0, y: 0 });
  const [shelters, setShelters] = useState([]);
  const [showShelters, setShowShelters] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [seletedItem, setSelectedItem] = useState<any>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: any) =>
      setMap(position.coords.longitude, position.coords.latitude)
    );
  }, []);

  const setMap = (x: number, y: number) => {
    setCurrentLoc({
      x,
      y,
    });
    if (map !== undefined) return;
    const { naver } = window;
    if (!mapRef.current || !naver) return;
    const mapOptions = {
      center: new naver.maps.LatLng(y, x),
      zoom: 16,
      mapTypeControl: true,
    };
    map = new naver.maps.Map("map", mapOptions);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(y, x),
      map: map,
      icon: icn_currentLoc,
    });
    getSheltersFunc().then((res) => addMarkers(res, map));
  };

  const getSheltersFunc = async () => {
    try {
      const res = await axios.get(`/api3/V2/api/DSSP-IF-10941`, options);
      setShelters(res.data.body);
      return res.data.body;
    } catch (e) {
      console.log(e);
    }
  };

  const addMarkers = async (shelterdata: any[], map: any) => {
    const array: {
      y: number;
      x: number;
      name: string;
      addr: string;
      type: string;
    }[] = [];
    const promises = shelterdata.map((s: any) => {
      return new Promise<void>((resolve) => {
        naver.maps.Service.geocode(
          { query: s.RONA_DADDR },
          function (status, res) {
            if (
              status === naver.maps.Service.Status.OK
              // &&
              // res.v2.addresses.length > 0
            )
              array.push({
                y: s.LAT,
                x: s.LOT,
                name: s.REARE_NM,
                addr: s.RONA_DADDR,
                type: s.SHLT_SE_NM,
              });
            else console.log(s.RONA_DADDR);
            resolve();
          }
        );
      });
    });

    await Promise.all(promises);
    drawMarkers(array, map);
  };

  const drawMarkers = (array: any[], map: any) => {
    for (var i = 0; i < array.length; i++) {
      const { y, x, name, addr, type } = array[i];
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(y, x),
        map: map,
        title: name,
        clickable: true,
        icon: {
          content: CustomMarker({ title: name }),
          anchor: new naver.maps.Point(40, 20),
        },
        visible: true,
      });
      marker.setTitle(name);
      naver.maps.Event.addListener(marker, "click", () => {
        setShowPath(true);
        setSelectedItem({ name: name, type: type, addr: addr, marker: marker });
      });
    }
  };

  const drawPath = async (marker: any) => {
    const mapOptions = {
      // center: map.getCenter(),
      // zoom: map.getZoom(),
      center: new naver.maps.LatLng(currentLoc.y, currentLoc.x),
      zoom: 16,
    };
    const newMap = new naver.maps.Map("map", mapOptions);

    const url = `/api2/v1/driving?goal=${marker.getPosition().x}%2C${marker.getPosition().y}&start=${currentLoc.x}}%2C${currentLoc.y}&option=trafast`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "x-ncp-apigw-api-key-id": process.env.REACT_APP_MAP_CLIENT,
        "x-ncp-apigw-api-key": process.env.REACT_APP_MAP_CLIENT_SECRET,
      },
    };
    try {
      const res = await axios.get(url, options);
      const path = res.data.route.trafast[0].path;
      var polyline = new naver.maps.Polyline({
        path: path,
        strokeColor: "#FF0000",
        strokeOpacity: 0.75,
        strokeWeight: 5,
        map: newMap,
      });
      const newMarker = new naver.maps.Marker({
        position: marker.getPosition(),
        map: newMap,
        title: marker.getTitle(),
        icon: {
          content: CustomMarker({ title: marker.getTitle() }),
          anchor: new naver.maps.Point(40, 20),
        },
      });
      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentLoc.y, currentLoc.x),
        map: newMap,
        icon: icn_currentLoc,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const closePath = () => {
    setShowPath(false);
    setSelectedItem(null);
    const mapOptions = {
      center: new naver.maps.LatLng(currentLoc.y, currentLoc.x),
      zoom: 16,
      mapTypeControl: true,
    };
    map = new naver.maps.Map("map", mapOptions);
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(currentLoc.y, currentLoc.x),
      map: map,
      icon: icn_currentLoc,
    });
    addMarkers(shelters, map);
  };

  const getMarkerInfo = (item: any) => {
    const { name, type, addr, marker } = item;
    return (
      <div className="relative flex flex-col gap-3 bg-white px-6 py-8 rounded-t-3xl shadow-[0_0_15px_1px_rgba(0,0,0,0.08)]">
        <div className="flex gap-3 items-center">
          <div>{name}</div>
          <div className="text-[#bbbbbb] text-sm">{type}</div>
        </div>
        <div>{addr}</div>
        <div
          className="text-white cursor-pointer py-3 w-full text-center bg-primary rounded-xl"
          onClick={() => drawPath(marker)}
        >
          대피소 길찾기
        </div>
        <div className="absolute top-4 right-6" onClick={() => closePath()}>
          x
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="h-12">
        <Header title="긴급상황" button={null} />
      </div>
      <div className="flex gap-3 absolute top-12 left-0 text-sm z-30 m-2 w-full">
        <div className="flex gap-1 bg-white items-center px-2 w-fit py-1 rounded-xl shadow-lg cursor-pointer">
          <img src={icn_redcross} />
          <div className="w-fit text-nowrap">응급진료</div>
        </div>
        <div className="flex gap-1 bg-white items-center px-2 w-fit py-1 rounded-xl shadow-lg cursor-pointer">
          <img src={icn_shelter} />
          <p>대피소</p>
        </div>
      </div>
      <div id="map" className="flex-1 w-full bg-lightgray z-20" ref={mapRef} />
      {showPath && seletedItem && (
        <div className="absolute bottom-0 z-30 w-full">
          {getMarkerInfo(seletedItem)}
        </div>
      )}
    </div>
  );
}

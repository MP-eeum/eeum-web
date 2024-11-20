import { useEffect, useRef, useState } from "react";
import axios from "axios";
import icn_redcross from "../../assets/icons/icn_redcross.svg";
import icn_shelter from "../../assets/icons/icn_shelter.png";
import icn_currentLoc from "../../assets/icons/icn_currentLoc.svg";
import Header from "../../components/Header";
import CustomMarker from "./CustomMarker";

export default function DisasterPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  let map: naver.maps.Map;

  const [currentLoc, setCurrentLoc] = useState({ x: 0, y: 0 });
  const [shelters, setShelters] = useState([]);
  const [showPlaces, setShowPlaces] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [showPath, setShowPath] = useState(false);
  const [seletedItem, setSelectedItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: any) =>
      setMap(position.coords.longitude, position.coords.latitude)
    );
  }, []);

  useEffect(() => {
    if (markers.length === 0) return;
    setVisibleMarkers();
  }, [markers, showPlaces]);

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
    getSheltersFunc().then((s) =>
      getHospitalsFunc().then((h) => addMarkers(s, h, map))
    );
  };

  const getSheltersFunc = async () => {
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
    setLoading(true);
    try {
      const res = await axios.get(`/api3/V2/api/DSSP-IF-10941`, options);
      setShelters(res.data.body);
      return res.data.body;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getHospitalsFunc = async () => {
    const options = {
      params: {
        serviceKey: process.env.REACT_APP_HOSPITAL,
        numOfRows: 1000,
        pageNo: 43, //40. 42, 43, 44
        returnType: "json",
      },
    };
    setLoading(true);
    try {
      const res = await axios.get(`/api3/V2/api/DSSP-IF-00128`, options);
      const filteredData = res.data.body.filter(
        (item: any) =>
          item.LAT > 37.268 &&
          item.LAT < 37.288 &&
          item.LOT_LAT > 127.04 &&
          item.LOT_LAT < 127.05
      );
      setHospitals(filteredData);
      return filteredData;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const addMarkers = async (
    shelterdata: any[],
    hospitaldata: any[],
    map: any
  ) => {
    const array: {
      y: number;
      x: number;
      name: string;
      addr: string;
      type: string;
      contentType: string;
    }[] = [];
    const promises = shelterdata.map((s: any) => {
      return new Promise<void>((resolve) => {
        naver.maps.Service.geocode(
          { query: s.RONA_DADDR },
          function (status, res) {
            if (status === naver.maps.Service.Status.OK)
              array.push({
                y: s.LAT,
                x: s.LOT,
                name: s.REARE_NM,
                addr: s.RONA_DADDR,
                type: s.SHLT_SE_NM,
                contentType: "shelter",
              });
            else console.log(s.RONA_DADDR);
            resolve();
          }
        );
      });
    });
    const promises2 = hospitaldata.map((h: any) => {
      return new Promise<void>((resolve) => {
        naver.maps.Service.geocode({ query: h.ADDR }, function (status, res) {
          if (status === naver.maps.Service.Status.OK)
            array.push({
              y: h.LAT,
              x: h.LOT_LAT,
              name: h.INST_NM,
              addr: h.ADDR,
              type: h.HSPTL_CLSF_NM,
              contentType: "hospital",
            });
          else console.log(h.ADDR);
          resolve();
        });
      });
    });

    await Promise.all(promises);
    await Promise.all(promises2);
    drawMarkers(array, map);
  };

  const drawMarkers = (array: any[], map: any) => {
    const arrayMarkers = [];
    for (var i = 0; i < array.length; i++) {
      const { y, x, name, addr, type, contentType } = array[i];
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(y, x),
        map: map,
        title: [contentType, name].join(" "),
        clickable: true,
        icon: {
          content: CustomMarker({ title: name }),
          anchor: new naver.maps.Point(40, 20),
        },
      });
      arrayMarkers.push(marker);
      naver.maps.Event.addListener(marker, "click", () => {
        setShowPath(true);
        setSelectedItem({ name: name, type: type, addr: addr, marker: marker });
      });
    }
    setMarkers(arrayMarkers);
  };

  const setVisibleMarkers = () => {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].getTitle().startsWith("shelter"))
        if (showPlaces === "shelter") markers[i].setVisible(true);
        else markers[i].setVisible(false);
      else if (markers[i].getTitle().startsWith("hospital"))
        if (showPlaces === "hospital") markers[i].setVisible(true);
        else markers[i].setVisible(false);
    }
  };

  const drawPath = async (marker: any) => {
    const mapOptions = {
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
          content: CustomMarker({
            title: marker.getTitle().split(" ").slice(1),
          }),
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
    addMarkers(shelters, hospitals, map);
  };

  const getMarkerInfo = (item: any) => {
    const { name, type, addr, marker } = item;
    return (
      <div className="relative flex flex-col gap-2 bg-white px-6 pb-5 pt-8 rounded-t-3xl shadow-[0_0_15px_1px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          <div className="text-lg font-medium">{name}</div>
          <div className="text-sm text-textgray">{type}</div>
        </div>
        <div className="mb-4">{addr}</div>
        <div
          className="w-full py-3 text-center text-white rounded-lg cursor-pointer bg-primary"
          onClick={() => drawPath(marker)}
        >
          대피소 길찾기
        </div>
        <div
          className="absolute cursor-pointer top-2 right-5"
          onClick={() => closePath()}
        >
          x
        </div>
      </div>
    );
  };

  const handleBtnClick = (btn: string) => {
    if (showPath) return;
    if (btn === showPlaces) setShowPlaces("");
    else setShowPlaces(btn);
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="h-12">
        <Header title="긴급상황" button={null} />
      </div>
      <div className="absolute left-0 z-30 flex gap-3 m-2 text-sm w-fit top-12">
        <div
          className={`flex items-center gap-1 px-2 py-1 shadow-lg cursor-pointer w-fit rounded-xl ${showPlaces === "hospital" ? "bg-primary text-white" : "bg-white"}`}
          onClick={() => handleBtnClick("hospital")}
        >
          <img src={icn_redcross} />
          <div className="w-fit text-nowrap">응급진료</div>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 shadow-lg cursor-pointer w-fit rounded-xl ${showPlaces === "shelter" ? "bg-primary text-white" : "bg-white"}`}
          onClick={() => handleBtnClick("shelter")}
        >
          <img src={icn_shelter} />
          <p>대피소</p>
        </div>
      </div>
      <div id="map" className="z-20 flex-1 w-full bg-lightgray" ref={mapRef} />
      {showPath && seletedItem && (
        <div className="absolute bottom-0 z-30 w-full animate-slideUp">
          {getMarkerInfo(seletedItem)}
        </div>
      )}
    </div>
  );
}

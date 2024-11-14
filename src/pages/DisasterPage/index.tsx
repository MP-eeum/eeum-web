import { useEffect, useRef, useState } from "react";
import axios from "axios";
import icn_currentLoc from "../../assets/svgs/icn_currentLoc.svg";
import icn_marker from "../../assets/svgs/icn_marker.svg";
import shelterdata from "../../shelterdata";
import Header from "../../components/Header";
import CustomMarker from "./CustomMarker";

export default function DisasterPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  let map: naver.maps.Map;

  const [currentLoc, setCurrentLoc] = useState({ x: 36.642, y: 127.49 });
  const [showPath, setShowPath] = useState(false);

  useEffect(() => {
    const { naver } = window;
    if (!mapRef.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(36.642, 127.49),
      zoom: 14,
      mapTypeControl: true,
    };
    map = new naver.maps.Map("map", mapOptions);
    // navigator.geolocation.getCurrentPosition((position: any) => {
    //   setCurrentLoc({
    //     y: position.coords.latitude,
    //     x: position.coords.longitude,
    //   });
    // });
    addMarkers();
  }, []);

  const addMarkers = async () => {
    const array: { y: number; x: number; name: string }[] = [];
    const promises = shelterdata.map((s) => {
      return new Promise<void>((resolve) => {
        naver.maps.Service.geocode({ query: s.addr }, function (status, res) {
          if (
            status === naver.maps.Service.Status.OK &&
            res.v2.addresses.length > 0
          ) {
            const resAddress = res.v2.addresses[0];
            const x = parseFloat(resAddress.x);
            const y = parseFloat(resAddress.y);
            array.push({ y, x, name: s.name });
          } else {
            console.log(s.addr);
          }
          resolve();
        });
      });
    });

    await Promise.all(promises);
    drawMarkers(array);
  };

  const drawMarkers = (array: any[]) => {
    for (var i = 0; i < array.length; i++) {
      const { y, x, name } = array[i];
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(y, x),
        map: map,
        title: name,
        clickable: true,
        icon: {
          content: CustomMarker({ title: name }),
          size: new naver.maps.Size(48, 35),
        },
        visible: true,
      });
      marker.setTitle(name);
      naver.maps.Event.addListener(marker, "click", () => drawPath(marker));
    }
  };

  const drawPath = async (marker: any) => {
    const mapOptions = {
      center: map.getCenter(),
      zoom: map.getZoom(),
    };
    const newMap = new naver.maps.Map("map", mapOptions);

    const url = `/api2/v1/driving?goal=${marker.getPosition().x}%2C${marker.getPosition().y}&start=${127.49}%2C${36.642}&option=trafast`;
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
          size: new naver.maps.Size(48, 35),
        },
      });
      setShowPath(true);
    } catch (e) {
      console.log(e);
    }
  };

  const closePath = () => {
    setShowPath(false);
    const mapOptions = {
      center: new naver.maps.LatLng(36.642, 127.49),
      zoom: 14,
      mapTypeControl: true,
    };
    map = new naver.maps.Map("map", mapOptions);
    addMarkers();
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="h-12">
        <Header title="긴급상황" button={null} />
      </div>
      <div id="map" className="flex-1 w-full bg-lightgray" ref={mapRef} />
      {showPath && (
        <div
          className="absolute text-2xl cursor-pointer top-24 right-3"
          onClick={() => closePath()}
        >
          X
        </div>
      )}
    </div>
  );
}

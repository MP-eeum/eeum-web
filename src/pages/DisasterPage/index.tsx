import { useEffect, useRef, useState } from "react";
import shelterdata from "../../shelterdata";
import Header from "../../components/Header";

export default function DisasterPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  let map: naver.maps.Map;

  useEffect(() => {
    const { naver } = window;
    if (!mapRef.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(36.642, 127.49),
      zoom: 13,
      mapTypeControl: true,
    };
    map = new naver.maps.Map("map", mapOptions);
    addMarkers();
  }, []);

  const addMarkers = async () => {
    const array: { y: number; x: number }[] = [];
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
            array.push({ y, x });
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
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(array[i]),
        map: map,
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="긴급상황" button={null} />
      <div id="map" className="flex-1 w-full bg-lightgray" ref={mapRef} />
    </div>
  );
}

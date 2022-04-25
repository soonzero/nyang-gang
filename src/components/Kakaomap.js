// global kakao
import React from "react";

export default function Kakaomap(props) {
  const { kakao } = window;
  const container = React.useRef(null);
  const options = {
    center: new kakao.maps.LatLng(37.2892074, 127.0522087),
    level: `5`,
  };

  React.useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

    if (props.center) {
      const coords = new kakao.maps.LatLng(props.center.lat, props.center.lon);
      map.setCenter(coords);
    } else if (props.currentPosition) {
      const coords = new kakao.maps.LatLng(
        props.currentPosition.lat,
        props.currentPosition.lon
      );
      map.setCenter(coords);
    }

    if (props.hospital && props.data) {
      props.data
        .filter((d) => d.BSN_STATE_NM !== "폐업")
        .map((d) => {
          const coords = new kakao.maps.LatLng(
            d.REFINE_WGS84_LAT,
            d.REFINE_WGS84_LOGT
          );
          const mark = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          const iwContent = `<div style="padding: 10px; text-align: center; width: 100%; height: 100%;">
        ${d.BIZPLC_NM}
        </div>`;

          const infoWindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });
          kakao.maps.event.addListener(mark, "mouseover", function () {
            infoWindow.open(map, mark);
          });
          kakao.maps.event.addListener(mark, "mouseout", function () {
            infoWindow.close();
          });
        });
    } else if (props.shelter && props.data) {
      props.data.map((d) => {
        const coords = new kakao.maps.LatLng(
          d.REFINE_WGS84_LAT,
          d.REFINE_WGS84_LOGT
        );
        const mark = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        const iwContent = `<div style="text-align: center; width: 100%; height: 100%;">
        ${d.ENTRPS_NM}
        </div>`;

        const infoWindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });
        kakao.maps.event.addListener(mark, "mouseover", function () {
          infoWindow.open(map, mark);
        });
        kakao.maps.event.addListener(mark, "mouseout", function () {
          infoWindow.close();
        });
      });
    }
  }, [props.center, props.data, props.currentPosition]);

  return (
    <div
      id="map"
      ref={container}
      style={{
        borderRadius: "8px",
        border: "1px solid #e5e5e5",
      }}
    ></div>
  );
}

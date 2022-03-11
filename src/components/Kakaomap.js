// global kakao
import React from "react";

export default function Kakaomap(props) {
  const { kakao } = window;
  const container = React.useRef(null);
  const options = {
    center: new kakao.maps.LatLng(37.547204943098656, 126.95447006935176),
    level: 2,
  };

  React.useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

    if (props.center.lat && props.center.lon) {
      const coords = new kakao.maps.LatLng(props.center.lat, props.center.lon);
      map.setCenter(coords);
    }

    if (props.data) {
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
    }
  }, [props.center, props.data]);

  return (
    <div
      id="map"
      ref={container}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}

// global kakao
import React from "react";
export default function Kakaomap(props) {
  const { kakao } = window;
  const container = React.useRef(null);
  const options = {
    center: new kakao.maps.LatLng(37.3031277883, 127.1223840785),
    level: 4,
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
      props.data.map((d) => {
        const coords = new kakao.maps.LatLng(
          d.REFINE_WGS84_LAT,
          d.REFINE_WGS84_LOGT
        );
        const mark = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        // const infoWindow = new kakao.maps.InfoWindow({
        //   content: `<div>${d.BIZPLC_NM}</div>`,
        // });
        // infoWindow.open(map, mark);
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

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
      const imageSrc =
        "https://firebasestorage.googleapis.com/v0/b/nyang-gang.appspot.com/o/hospital.png?alt=media&token=5087021d-9b96-4f8b-a209-c038aa181d1c";
      const imageSize = new kakao.maps.Size(30, 45);
      const imageOption = { offset: new kakao.maps.Point(15, 45) };
      const markerImg = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

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
            image: markerImg,
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
      const imageSrc =
        "https://firebasestorage.googleapis.com/v0/b/nyang-gang.appspot.com/o/shelter.png?alt=media&token=38feffab-3e16-492f-9e0e-41398fe96ef3";
      const imageSize = new kakao.maps.Size(30, 48);
      const imageOption = { offset: new kakao.maps.Point(15, 48) };
      const markerImg = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      props.data.map((d) => {
        const coords = new kakao.maps.LatLng(
          d.REFINE_WGS84_LAT,
          d.REFINE_WGS84_LOGT
        );
        const mark = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImg,
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
    } else if (props.modal && props.data) {
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
        ${d.DIV_NM}
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
    } else if (props.pharmacy && props.data) {
      const imageSrc =
        "https://firebasestorage.googleapis.com/v0/b/nyang-gang.appspot.com/o/pharmacy.png?alt=media&token=580dbdb8-befe-4011-901a-c5416a2ece20";
      const imageSize = new kakao.maps.Size(30, 45);
      const imageOption = { offset: new kakao.maps.Point(15, 45) };
      const markerImg = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      props.data.map((d) => {
        const coords = new kakao.maps.LatLng(
          d.REFINE_WGS84_LAT,
          d.REFINE_WGS84_LOGT
        );
        const mark = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImg,
        });
        const iwContent = `<div style="text-align: center; width: 100%; height: 100%;">
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

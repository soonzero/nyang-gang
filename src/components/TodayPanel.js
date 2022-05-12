import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { TodayPanelStyle } from "./styled";

export default function TodayPanel() {
  let didCancel = false;
  const API_KEY = process.env.REACT_APP_PUB_DATA_API_KEY;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const getData = async () => {
    setIsLoading(true);
    try {
      const index = Math.ceil(Math.random() * 10);
      const result = await axios({
        method: "GET",
        url: `https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=${API_KEY}&Type=json&pIndex=1&pSize=15&STATE_NM=보호중`,
      });
      if (!didCancel) {
        setData(
          result.data.AbdmAnimalProtect[1].row.filter(
            (d) => d.IMAGE_COURS != undefined
          )[index]
        );
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();

    return () => {
      didCancel = false;
    };
  }, []);

  return (
    <TodayPanelStyle>
      {!isLoading ? (
        <div
          className="animal"
          onClick={() => navigate(`/abandoned/${data.ABDM_IDNTFY_NO}`)}
        >
          <h2 className="title">가족을 기다리고 있어요</h2>
          <span
            className="img"
            style={{ backgroundImage: `url(${data.IMAGE_COURS})` }}
          ></span>
          <p className="desc">현재 {data.SHTER_NM}에서 보호 중</p>
        </div>
      ) : (
        <Loading notext />
      )}
    </TodayPanelStyle>
  );
}

import { TodayPanelStyle } from "./styled";

export default function TodayPanel() {
  return (
    <TodayPanelStyle>
      <h2 className="title">가족을 기다리고 있어요</h2>
      <span className="img"></span>
      <p className="desc">현재 --에서 보호 중</p>
    </TodayPanelStyle>
  );
}

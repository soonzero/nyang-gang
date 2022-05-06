import { LoadingStyle } from "./styled";
import { ReactComponent as Spinner } from "images/spinner.svg";

export default function Loading(props) {
  return (
    <LoadingStyle modal={props.modal}>
      <div className="loading">
        <Spinner />
        🐱 목록을 불러오고 있어요! 조금만 기다려주세요! 🐶
      </div>
    </LoadingStyle>
  );
}

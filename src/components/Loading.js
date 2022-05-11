import { LoadingStyle } from "./styled";
import { ReactComponent as Spinner } from "images/spinner.svg";

export default function Loading(props) {
  return (
    <LoadingStyle modal={props.modal} notext={props.notext}>
      <div className="loading">
        <Spinner />
        {!props.notext && `🐱 목록을 불러오고 있어요! 조금만 기다려주세요! 🐶`}
      </div>
    </LoadingStyle>
  );
}

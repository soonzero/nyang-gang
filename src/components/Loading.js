import { ReactComponent as Spinner } from "images/spinner.svg";

export default function Loading() {
  return (
    <>
      <div className="loading">
        <Spinner />
        🐱 목록을 불러오고 있어요! 조금만 기다려주세요! 🐶
      </div>
    </>
  );
}

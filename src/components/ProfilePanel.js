import { ProfilePanelStyle } from "./styled";

export default function ProfilePanel() {
  return (
    <ProfilePanelStyle>
      <div className="content my-profile">
        <span className="profile-img"></span>
        <h3 className="profile-name">닉네임</h3>
      </div>
      <div className="content articles">
        <div className="my-articles complete">
          <span>대기중</span>
          <span>1개</span>
        </div>
        <div className="my-articles waiting">
          <span>승인 완료</span>
          <span>5개</span>
        </div>
        <div className="my-articles rejected">
          <span>승인 거절</span>
          <span>2개</span>
        </div>
      </div>
      <div className="content new-article">
        <div className="write">글쓰기</div>
      </div>
    </ProfilePanelStyle>
  );
}

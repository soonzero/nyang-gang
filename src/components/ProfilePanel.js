import { db } from "components/fbase/fbase";
import { useEffect, useState } from "react";
import { ProfilePanelStyle } from "./styled";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function ProfilePanel(props) {
  let didCancel = false;

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", sessionStorage.getItem("uid"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (!didCancel) {
          props.setNickname(docSnap.data().nickname);
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      didCancel = true;
    };
  }, []);
  return (
    <ProfilePanelStyle>
      {!isLoading ? (
        <>
          <div className="content my-profile">
            <span
              className="profile-img"
              style={{ backgroundImage: `url(${props.image})` }}
            ></span>
            <h3 className="profile-name">{props.nickname}</h3>
          </div>
          <div className="content articles">
            <div className="my-articles complete">
              <span>대기중</span>
              <span>준비 중</span>
            </div>
            <div className="my-articles waiting">
              <span>승인 완료</span>
              <span>준비 중</span>
            </div>
            <div className="my-articles rejected">
              <span>승인 거절</span>
              <span>준비 중</span>
            </div>
          </div>
          <div className="content new-article">
            <Link to="/adoption/write">
              <div className="write">글쓰기</div>
            </Link>
          </div>
        </>
      ) : (
        <Loading notext />
      )}
    </ProfilePanelStyle>
  );
}

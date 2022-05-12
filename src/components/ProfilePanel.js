import { db } from "components/fbase/fbase";
import { useEffect, useState } from "react";
import { ProfilePanelStyle } from "./styled";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";

export default function ProfilePanel(props) {
  let didCancel = false;

  const [nickname, setNickname] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", sessionStorage.getItem("uid"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (!didCancel) {
          setNickname(docSnap.data().nickname);
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
            <h3 className="profile-name">{nickname}</h3>
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
        </>
      ) : (
        <Loading notext />
      )}
    </ProfilePanelStyle>
  );
}

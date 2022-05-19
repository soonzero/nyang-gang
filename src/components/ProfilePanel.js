import { db } from "components/fbase/fbase";
import { useEffect, useState } from "react";
import { ProfilePanelStyle } from "./styled";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function ProfilePanel(props) {
  let didCancel = false;

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState();

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
      let q;
      if (docSnap.data().auth) {
        q = query(collection(db, "adoption"));
      } else {
        q = query(
          collection(db, "adoption"),
          where("author", "==", `${sessionStorage.getItem("uid")}`)
        );
      }
      const querySnapshot = await getDocs(q);
      const myArticlesArray = [];
      querySnapshot.forEach((doc) => {
        myArticlesArray.push(doc.data());
      });
      setArticles(myArticlesArray);
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
              <span>대기 중</span>
              <span>
                {articles &&
                  articles.filter((a) => a.status == "waiting").length}
                개
              </span>
            </div>
            <div className="my-articles waiting">
              <span>승인 완료</span>
              <span>
                {articles &&
                  articles.filter((a) => a.status == "approved").length}
                개
              </span>
            </div>
            <div className="my-articles rejected">
              <span>승인 거절</span>
              <span>
                {articles &&
                  articles.filter((a) => a.status == "rejected").length}
                개
              </span>
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

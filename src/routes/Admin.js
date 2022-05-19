import Navbar from "components/Navbar";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { AdminStyle, ContentStyle } from "components/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "components/fbase/fbase";
import Feed from "components/Feed";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  let didCancel = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("waiting");
  const [admin, setAdmin] = useState();

  const getArticles = async () => {
    const articlesSnapshot = await getDocs(collection(db, "adoption"));
    const articlesArray = [];
    articlesSnapshot.forEach((doc) => {
      articlesArray.push(doc.data());
    });
    if (!didCancel) {
      dispatch({
        type: "SET_ARTICLES",
        data: articlesArray.filter(
          (a) =>
            a.status ==
            (filter == "waiting"
              ? "waiting"
              : filter == "approved"
              ? "approved"
              : "rejected")
        ),
      });
    }
  };

  const setAuthority = async () => {
    const userRef = doc(db, "users", sessionStorage.getItem("uid"));
    const userSnap = await getDoc(userRef);
    if (userSnap.data().auth) {
      setAdmin(true);
    } else {
      setAdmin(false);
      alert("관리자 메뉴입니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    setAuthority();
  }, []);

  useEffect(() => {
    getArticles();
    return () => {
      didCancel = true;
    };
  }, [filter]);

  const articlesList = useSelector((state) => state.manageArticles);

  return (
    <>
      {admin && (
        <>
          <Navbar admin subnav filter={filter} setFilter={setFilter} />
          <ContentStyle>
            <AdminStyle>
              <Feed admin data={articlesList} />
            </AdminStyle>
          </ContentStyle>
        </>
      )}
    </>
  );
}

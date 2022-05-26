import WriteComment from "./WriteComment";
import { ArticleStyle } from "./styled";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./fbase/fbase";
import { useState, useEffect } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";
import Loading from "./Loading";
import Comment from "./Comment";
import { ReactComponent as Extra } from "images/extra.svg";
import { useDispatch } from "react-redux";

export default function Article(props) {
  let didCancel = false;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useState();
  const [authorImg, setAuthorImg] = useState();
  const [articleSubmenu, setArticleSubmenu] = useState(false);

  const getData = async () => {
    try {
      const docRef = doc(db, "users", `${props.data.author}`);
      const docSnap = await getDoc(docRef);
      const storage = getStorage();
      arrangeImages(props.data.imageslink);
      getDownloadURL(ref(storage, `users/${props.data.author}/profile-image`))
        .then((url) => {
          if (!didCancel) {
            setAuthorImg(url);
          }
        })
        .catch((e) => {
          if (e.code == "storage/object-not-found") {
            setAuthorImg(
              "https://firebasestorage.googleapis.com/v0/b/nyang-gang.appspot.com/o/deleted-account.png?alt=media&token=b341e4dc-fb85-403d-950d-d07ea878992a"
            );
          }
        });
      if (!didCancel) {
        setNickname(
          docSnap.data().nickname == undefined
            ? "탈퇴한 사용자"
            : docSnap.data().nickname
        );
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const arrangeImages = (array) => {
    const extraction = array.splice(props.data.thumbnail, 1);
    array.unshift(extraction);
  };

  const convertTime = (time) => {
    const second = 1;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const timePassed = Math.trunc((new Date().getTime() - time) / 1000);

    if (timePassed < 60) {
      return `방금 전`;
    } else if (timePassed < minute) {
      return `${timePassed}초 전`;
    } else if (timePassed < hour) {
      return `${Math.trunc(timePassed / minute)}분 전`;
    } else if (timePassed < day) {
      return `${Math.trunc(timePassed / hour)}시간 전`;
    } else if (timePassed < 7 * day) {
      return `${Math.trunc(timePassed / day)}일 전`;
    } else {
      return `${Math.floor(time / (day * 365 * 1000) + 1970)}년`;
    }
  };

  const deleteArticle = async (article) => {
    try {
      if (
        window.confirm("삭제된 글은 다시 복구할 수 없습니다. 진행하시겠습니까?")
      ) {
        const id = article.id;
        const storage = getStorage();
        await deleteDoc(doc(db, "adoption", id));
        for (let i = 0; i < article.images; i++) {
          const imageRef = ref(storage, `articles/${id}/${i}`);
          deleteObject(imageRef);
        }
        dispatch({ type: "DELETE_ARTICLE", data: id });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const manageArticle = async (event) => {
    const target = event.currentTarget.getAttribute("name");
    try {
      if (target == "approve") {
        const docRef = doc(db, "adoption", `${props.data.id}`);
        await updateDoc(docRef, {
          status: "approved",
        });
        dispatch({ type: "APPROVE_ARTICLE", data: props.data });
      } else if (target == "reject") {
        const docRef = doc(db, "adoption", `${props.data.id}`);
        await updateDoc(docRef, {
          status: "rejected",
        });
        dispatch({ type: "REJECT_ARTICLE", data: props.data });
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

  useEffect(() => {
    setNickname(nickname);
  }, [nickname]);

  useEffect(() => {
    setAuthorImg(authorImg);
  }, [authorImg]);

  return (
    <ArticleStyle admin={props.admin}>
      {!isLoading ? (
        <>
          <div className="author-container">
            <div className="author">
              <span
                className="author-img"
                style={{ backgroundImage: `url(${authorImg})` }}
              ></span>
              <h3 className="author-name">
                {nickname && nickname}
                <span className="updated-time">
                  {convertTime(props.data.time)}
                </span>
              </h3>
            </div>
            {!props.admin &&
              props.data.author == sessionStorage.getItem("uid") && (
                <div className="author-extra">
                  <span
                    className="extra-button"
                    onClick={() => setArticleSubmenu((prev) => !prev)}
                  >
                    <Extra />
                  </span>
                  {articleSubmenu && (
                    <ul className="extra-sub">
                      <li onClick={() => deleteArticle(props.data)}>
                        글 삭제하기
                      </li>
                    </ul>
                  )}
                </div>
              )}
            {props.admin && (
              <div className="manage-container">
                <span
                  name="approve"
                  className="manage-button"
                  onClick={manageArticle}
                >
                  승인
                </span>
                <span
                  name="reject"
                  className="manage-button"
                  onClick={manageArticle}
                >
                  거절
                </span>
              </div>
            )}
          </div>
          <div className="title-container">
            <h2 className="title">{props.data.title}</h2>
          </div>
          <div className="content">
            <div className="content-text">{props.data.main}</div>
            <div className="content-imgs">
              {props.data.imageslink.map((i) => {
                return (
                  <div
                    key={i}
                    className="content-img"
                    style={{ backgroundImage: `url(${i})` }}
                  ></div>
                );
              })}
            </div>
          </div>
          {!props.admin && (
            <div className="comments">
              <ul className="comments-list">
                {props.comments[props.data.id] &&
                  props.comments[props.data.id]
                    .sort((a, b) => {
                      if (a.time < b.time) {
                        return 1;
                      }
                      if (a.time > b.time) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((c, i) => {
                      return (
                        <Comment key={i} article={props.data.id} data={c} />
                      );
                    })}
                <li className="comment-container">
                  <div className="comment">
                    <div className="comment-content">
                      <span
                        className="commenter-img"
                        style={{ backgroundImage: `url(${props.image})` }}
                      ></span>
                      <span className="commenter-name">{props.nickname}</span>
                    </div>
                    <WriteComment id={props.data.id} />
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <Loading notext />
      )}
    </ArticleStyle>
  );
}

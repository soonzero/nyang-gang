import WriteComment from "./WriteComment";
import { ArticleStyle } from "./styled";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
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
import { useDispatch, useSelector } from "react-redux";

export default function Article(props) {
  let didCancel = false;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useState();
  const [authorImg, setAuthorImg] = useState();
  const [images, setImages] = useState();
  const [articleSubmenu, setArticleSubmenu] = useState(false);

  const getData = async () => {
    try {
      let imagesArray = [];
      const docRef = doc(db, "users", `${props.data.author}`);
      const docSnap = await getDoc(docRef);
      const storage = getStorage();
      const url = await getDownloadURL(
        ref(storage, `users/${props.data.author}/profile-image`)
      );
      for (let i = 0; i < props.data.images; i++) {
        const contentImgs = await getDownloadURL(
          ref(storage, `articles/${props.data.id}/${i}`)
        );
        imagesArray.push(contentImgs);
      }
      setImages(imagesArray);
      if (!didCancel) {
        setNickname(docSnap.data().nickname);
        setAuthorImg(url);
        dispatch({ type: "SET_COMMENTS", data: props.data.comments });
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
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
      return `${Math.floor(time / (3600 * 24 * 365 * 1000) + 1970)}년`;
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

  const commentsList = useSelector((state) => state.manageComments);

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
    <ArticleStyle>
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
            {props.data.author == sessionStorage.getItem("uid") && (
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
          </div>
          <div className="title-container">
            <h2 className="title">{props.data.title}</h2>
          </div>
          <div className="content">
            <div className="content-text">{props.data.main}</div>
            <div className="content-imgs">
              {images.map((i) => {
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
          <div className="comments">
            <ul className="comments-list">
              {commentsList &&
                commentsList.map((c, i) => {
                  return <Comment key={i} article={props.data.id} data={c} />;
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
        </>
      ) : (
        <Loading notext />
      )}
    </ArticleStyle>
  );
}

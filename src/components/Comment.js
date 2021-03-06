import { ReactComponent as Extra } from "images/extra.svg";
import { useEffect, useState } from "react";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./fbase/fbase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

export default function Comment(props) {
  let didCancel = false;
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState();
  const [image, setImage] = useState();
  const [submenu, setSubmenu] = useState(false);

  const getData = async () => {
    try {
      const docRef = doc(db, "users", `${props.data.author}`);
      const docSnap = await getDoc(docRef);
      const storage = getStorage();
      getDownloadURL(ref(storage, `users/${props.data.author}/profile-image`))
        .then((url) => {
          if (!didCancel) {
            setImage(url);
          }
        })
        .catch((error) => {
          if (error.code == "storage/object-not-found") {
            setImage(
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async (comment) => {
    try {
      if (
        window.confirm(
          "삭제된 댓글은 다시 복구할 수 없습니다. 진행하시겠습니까?"
        )
      ) {
        const articleRef = doc(db, "adoption", props.article);
        await updateDoc(articleRef, {
          comments: arrayRemove({
            author: comment.author,
            content: comment.content,
            time: comment.time,
          }),
        });
        dispatch({
          type: "DELETE_COMMENT",
          data: {
            id: props.article,
            comment: {
              author: comment.author,
              content: comment.content,
              time: comment.time,
            },
          },
        });
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
    <li className="comment-container">
      <div className="comment">
        <div className="comment-content">
          <span
            className="commenter-img"
            style={{ backgroundImage: `url(${image})` }}
          ></span>
          <span className="commenter-name">{nickname}</span>
          <p className="comment-text">{props.data.content}</p>
        </div>
        {props.data.author == sessionStorage.getItem("uid") && (
          <div className="author-extra">
            <span className="extra" onClick={() => setSubmenu((prev) => !prev)}>
              <Extra />
            </span>
            {submenu && (
              <ul className="extra-sub">
                <li onClick={() => deleteComment(props.data)}>댓글 삭제하기</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

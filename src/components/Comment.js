import { ReactComponent as Extra } from "images/extra.svg";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./fbase/fbase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

export default function Comment(props) {
  let didCancel = false;

  const [nickname, setNickname] = useState();
  const [image, setImage] = useState();

  const getData = async () => {
    try {
      const docRef = doc(db, "users", `${props.data.author}`);
      const docSnap = await getDoc(docRef);
      const storage = getStorage();
      const url = await getDownloadURL(
        ref(storage, `users/${props.data.author}/profile-image.png`)
      );
      if (!didCancel) {
        setNickname(docSnap.data().nickname);
        setImage(url);
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
          <span className="extra">
            <Extra />
          </span>
        )}
      </div>
    </li>
  );
}

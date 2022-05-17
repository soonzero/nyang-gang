import React, { useEffect, useState } from "react";
import { WriteCommentStyle } from "./styled";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./fbase/fbase";
import { useDispatch } from "react-redux";

export default function WriteCommment(props) {
  const dispatch = useDispatch();
  const [text, setText] = useState();

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const time = new Date().getTime();
      const author = sessionStorage.getItem("uid");
      const articleRef = doc(db, "adoption", props.id);
      await updateDoc(articleRef, {
        comments: arrayUnion({
          author: author,
          time: time,
          content: text,
        }),
      });
      dispatch({
        type: "ADD_COMMENT",
        data: {
          author: author,
          time: time,
          content: text,
        },
      });
      alert("댓글이 등록되었어요");
      setText("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setText(text);
  }, [text]);

  return (
    <WriteCommentStyle>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          maxLength={150}
          value={text}
          placeholder="댓글을 입력하세요"
          onChange={onChangeHandler}
        />
        <button type="submit">작성</button>
      </form>
    </WriteCommentStyle>
  );
}

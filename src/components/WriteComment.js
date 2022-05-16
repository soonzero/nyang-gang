import React, { useEffect, useState } from "react";
import { WriteCommentStyle } from "./styled";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./fbase/fbase";

export default function WriteCommment(props) {
  const [text, setText] = useState();

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const articleRef = doc(db, "adoption", props.id);
      await updateDoc(articleRef, {
        comments: arrayUnion({
          author: sessionStorage.getItem("uid"),
          time: new Date().getTime(),
          content: text,
        }),
      });
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

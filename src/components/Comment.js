import React, { useEffect, useState } from "react";
import { CommentStyle } from "./styled";

export default function Commment() {
  const [text, setText] = useState();

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submitted!");
  };

  useEffect(() => {
    setText(text);
  }, [text]);

  return (
    <CommentStyle>
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
    </CommentStyle>
  );
}

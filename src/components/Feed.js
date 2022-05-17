import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Article from "./Article";
import { db } from "./fbase/fbase";
import { FeedStyle, NoArticleStyle } from "./styled";
import { useDispatch, useSelector } from "react-redux";

export default function Feed(props) {
  let didCancel = false;
  const dispatch = useDispatch();

  const getArticles = async () => {
    const articlesSnapshot = await getDocs(collection(db, "adoption"));
    const articlesArray = [];
    articlesSnapshot.forEach((doc) => {
      articlesArray.push(doc.data());
    });
    if (!didCancel) {
      dispatch({ type: "SET_ARTICLES", data: articlesArray });
    }
  };

  const articlesList = useSelector((state) => state.manageArticles);

  useEffect(() => {
    getArticles();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <FeedStyle>
      {articlesList && articlesList.length > 0 ? (
        articlesList.map((article) => {
          return (
            <Article
              image={props.image}
              nickname={props.nickname}
              key={article.id}
              data={article}
            />
          );
        })
      ) : (
        <NoArticleStyle>글이 없어요</NoArticleStyle>
      )}
    </FeedStyle>
  );
}

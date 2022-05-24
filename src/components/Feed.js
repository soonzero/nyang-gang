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
      dispatch({
        type: "SET_ARTICLES",
        data: articlesArray.filter((a) => a.status == "approved"),
      });
      let comments = {};
      articlesArray.map((a) => {
        comments[a.id] = a.comments;
      });
      dispatch({ type: "SET_COMMENTS", data: comments });
    }
  };

  const articlesList = useSelector((state) => state.manageArticles);
  const commentsList = useSelector((state) => state.manageComments);

  useEffect(() => {
    if (!props.admin) {
      getArticles();
    }

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <FeedStyle>
      {!props.admin && (
        <>
          {articlesList && articlesList.length > 0 ? (
            articlesList.map((article) => {
              return (
                <Article
                  admin={props.admin}
                  image={props.image}
                  nickname={props.nickname}
                  key={article.id}
                  data={article}
                  comments={commentsList}
                />
              );
            })
          ) : (
            <NoArticleStyle>글이 없어요</NoArticleStyle>
          )}
        </>
      )}
      {props.admin && (
        <>
          {props.data && props.data.length > 0 ? (
            props.data.map((article) => {
              return (
                <Article admin={props.admin} key={article.id} data={article} />
              );
            })
          ) : (
            <NoArticleStyle>글이 없어요</NoArticleStyle>
          )}
        </>
      )}
    </FeedStyle>
  );
}

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Article from "./Article";
import { db } from "./fbase/fbase";
import { FeedStyle } from "./styled";

export default function Feed(props) {
  let didCancel = false;
  const [articles, setArticles] = useState();

  const getArticles = async () => {
    const articlesSnapshot = await getDocs(collection(db, "adoption"));
    const articlesArray = [];
    articlesSnapshot.forEach((doc) => {
      articlesArray.push(doc.data());
    });
    if (!didCancel) {
      setArticles(articlesArray);
    }
  };

  useEffect(() => {
    getArticles();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <FeedStyle>
      {articles &&
        articles.map((article) => {
          return (
            <Article
              image={props.image}
              nickname={props.nickname}
              key={article.id}
              data={article}
            />
          );
        })}
    </FeedStyle>
  );
}

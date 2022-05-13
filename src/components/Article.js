import Comment from "./Comment";
import { ArticleStyle } from "./styled";
import { ReactComponent as Extra } from "images/extra.svg";

export default function Article() {
  return (
    <ArticleStyle>
      <div className="author">
        <span className="author-img"></span>
        <h3 className="author-name">
          작성자
          <span className="updated-time">2022.05.11</span>
        </h3>
      </div>
      <div className="content">
        <span className="content-img"></span>
        <p className="content-text">내용</p>
      </div>
      <div className="comments">
        <ul className="comments-list">
          <li className="comment-container">
            <div className="comment">
              <div className="comment-content">
                <span className="commenter-img"></span>
                <span className="commenter-name">닉네임</span>
                <p className="comment-text">댓글 내용</p>
              </div>
              <span className="extra">
                <Extra />
              </span>
            </div>
          </li>
          <li className="comment-container">
            <div className="comment">
              <div className="comment-content">
                <span className="commenter-img"></span>
                <span className="commenter-name">닉네임</span>
                <p className="comment-text">댓글 내용</p>
              </div>
              <span className="extra">
                <Extra />
              </span>
            </div>
          </li>
          <li className="comment-container">
            <div className="comment">
              <div className="comment-content">
                <span className="commenter-img"></span>
                <span className="commenter-name">닉네임</span>
              </div>
              <Comment />
            </div>
          </li>
        </ul>
      </div>
    </ArticleStyle>
  );
}

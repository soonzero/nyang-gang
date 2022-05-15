import Navbar from "components/Navbar";
import { ContentStyle, WriteArticleStyle } from "components/styled";

export default function WriteArticle() {
  return (
    <>
      <Navbar />
      <ContentStyle>
        <WriteArticleStyle>
          <h1 className="form-header">글쓰기</h1>
          <input
            type="text"
            id="title"
            className="title"
            placeholder="여기에 제목을 입력해주세요"
          />
          <textarea
            className="main-text"
            placeholder="여기에 본문 내용을 입력해주세요"
          />
          <div className="form-footer">
            <label className="image-label" htmlFor="upload-image">
              여기를 눌러 이미지를 첨부해주세요
            </label>
            <input
              id="upload-image"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              className="image"
              required
            />
            <button type="submit" className="write-button">
              등록
            </button>
          </div>
        </WriteArticleStyle>
      </ContentStyle>
    </>
  );
}

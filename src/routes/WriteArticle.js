import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import { ContentStyle, WriteArticleStyle } from "components/styled";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "components/fbase/fbase";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function WriteArticle() {
  const navigate = useNavigate();

  const [images, setImages] = useState();
  const [title, setTitle] = useState();
  const [main, setMain] = useState();
  const [thumbnail, setThumbnail] = useState();

  const onChangeHandler = (event) => {
    const target = event.currentTarget.getAttribute("name");
    if (target == "image") {
      const imageFiles = event.target.files;
      if (imageFiles.length > 3) {
        alert("이미지는 최대 3개까지만 등록 가능해요");
      } else {
        setImages(imageFiles);
      }
    } else if (target == "title") {
      setTitle(event.target.value);
    } else if (target == "main-text") {
      setMain(event.target.value);
    }
  };

  const preview = () => {
    if (images && images.length > 0) {
      const imagesArray = Array.from(images);
      imagesArray.forEach((img, idx) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => {
          const imgContainer = document.querySelector(`.image${idx}`);
          imgContainer.style.backgroundImage = `url(${reader.result})`;
        };
      });
    }
  };

  const selectThumbnail = (event) => {
    const idx = event.target.getAttribute("name");
    if (idx == "0") {
      setThumbnail("0");
    } else if (idx == "1") {
      setThumbnail("1");
    } else if (idx == "2") {
      setThumbnail("2");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (thumbnail == undefined) {
      alert("썸네일로 사용할 이미지를 선택해주세요");
    } else {
      try {
        const docRef = await addDoc(collection(db, "adoption"), {
          author: getAuth().currentUser.uid,
          time: new Date().getTime(),
          title: title,
          main: main,
          thumbnail: thumbnail,
          comments: [],
          images: images.length,
        });
        await setDoc(
          docRef,
          {
            id: docRef.id,
          },
          {
            merge: true,
          }
        );
        const storage = getStorage();
        for (let i = 0; i < images.length; i++) {
          const storageRef = ref(storage, `articles/${docRef.id}/${i}`);
          uploadBytes(storageRef, images[i]).then((snapshot) => {});
        }
        alert("등록이 완료되었어요");
        navigate("/adoption");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    setImages(images);
    preview();
  }, [images]);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  useEffect(() => {
    setMain(main);
  }, [main]);

  useEffect(() => {
    setThumbnail(thumbnail);
  }, [thumbnail]);

  return (
    <>
      <Navbar />
      <ContentStyle>
        <WriteArticleStyle onSubmit={onSubmitHandler}>
          <h1 className="form-header">글쓰기</h1>
          <input
            type="text"
            id="title"
            name="title"
            className="title"
            required
            placeholder="여기에 제목을 입력해주세요"
            onChange={onChangeHandler}
          />
          <textarea
            className="main-text"
            name="main-text"
            placeholder="여기에 본문 내용을 입력해주세요"
            required
            onChange={onChangeHandler}
          />
          <div className="form-footer">
            <div className="upload-preview">
              <label className="image-label" htmlFor="upload-image">
                {images && images.length > 0
                  ? "이미지를 다시 선택하시려면 여기를 눌러주세요"
                  : "여기를 눌러 이미지를 첨부해주세요 (최대 3개)"}
              </label>
              {images && images.length > 0 && (
                <div className="preview-container">
                  {images[0] && (
                    <div
                      className="image0"
                      name="0"
                      onClick={selectThumbnail}
                      style={{
                        border: `2px solid ${
                          thumbnail == "0" ? "#f57977" : "transparent"
                        }`,
                      }}
                    ></div>
                  )}
                  {images[1] && (
                    <div
                      className="image1"
                      name="1"
                      onClick={selectThumbnail}
                      style={{
                        border: `2px solid ${
                          thumbnail == "1" ? "#f57977" : "transparent"
                        }`,
                      }}
                    ></div>
                  )}
                  {images[2] && (
                    <div
                      className="image2"
                      name="2"
                      onClick={selectThumbnail}
                      style={{
                        border: `2px solid ${
                          thumbnail == "2" ? "#f57977" : "transparent"
                        }`,
                      }}
                    ></div>
                  )}
                </div>
              )}
              <input
                id="upload-image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                className="image"
                required
                multiple
                onChange={onChangeHandler}
              />
            </div>
            <button type="submit" className="write-button">
              등록
            </button>
          </div>
        </WriteArticleStyle>
      </ContentStyle>
    </>
  );
}

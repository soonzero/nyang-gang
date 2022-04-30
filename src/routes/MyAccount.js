import Navbar from "components/Navbar";
import { ContentStyle, MyAccountStyle } from "components/styled";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { authService } from "components/fbase/fbase";
import { Link, useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const [file, setFile] = useState();
  const [email, setEmail] = useState();
  const [disabled, setDisabled] = useState(true);

  const onChangeHandler = (event) => {
    if (event.target.name == "file") {
      const image = event.target.files;
      setFile(image);
    } else if (event.target.name == "email") {
      setEmail(event.target.value);
    }
  };

  if (sessionStorage.getItem("uid")) {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${sessionStorage.getItem("uid")}.png`))
      .then((url) => {
        const img = document.querySelector(".image-preview");
        img.setAttribute("src", url);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const preview = () => {
    const container = document.querySelector(".image-preview");
    if (file && file[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        container.style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(file[0]);
    } else {
      container.style.backgroundImage = "none";
    }
  };

  useEffect(() => {
    setFile(file);
    if (file) {
      preview();
    }
  }, [file]);

  useEffect(() => {
    setEmail(email);
    if (getAuth().currentUser) {
      if (email == getAuth().currentUser.email) {
        setDisabled(true);
      } else {
        if (emailReg.test(email)) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }
    }
  }, [email]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    if (event.target.name == "email") {
      updateEmail(auth.currentUser, email)
        .then(() => {
          alert("이메일이 변경되었어요. 다시 로그인해주세요!");
          authService.signOut();
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (event.target.name == "profile-img") {
      if (file) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `images/${sessionStorage.getItem("uid")}.png`
        );
        uploadBytes(storageRef, file[0]).then((snapshot) => {
          alert("프로필 이미지가 변경되었어요!");
          navigate("/");
        });
      } else {
        alert("이미지를 업로드해주세요!");
      }
    }
  };

  return (
    <>
      <Navbar auth setting myaccount />
      <ContentStyle>
        <MyAccountStyle>
          <div className="edit-header">
            <h2>회원정보수정</h2>
            <Link to="/delete">
              <span>회원 탈퇴</span>
            </Link>
          </div>
          <div className="edit-main">
            <form
              className="edit-form email"
              name="email"
              onSubmit={onSubmitHandler}
            >
              <h3 className="edit-target">이메일</h3>
              <input
                className="edit-input"
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={email}
              ></input>
              <button className="edit-button" disabled={disabled} type="submit">
                이메일 변경하기
              </button>
            </form>
            {/* <form className="edit-form password">
              <h3 className="edit-target">비밀번호</h3>
              <div>
                <input className="edit-input" type="password"></input>
                <input className="edit-input-confirm" type="password"></input>
              </div>
              <button className="edit-button">비밀번호 변경하기</button>
            </form> */}
            <form
              className="edit-form profile-img"
              name="profile-img"
              onSubmit={onSubmitHandler}
            >
              <h3 className="edit-target">프로필 이미지</h3>
              <label className="image-preview" htmlFor="edit-input-profile-img">
                {file && file[0] ? null : (
                  <span className="click-here">
                    여기를 눌러 원하는 프로필 이미지를 등록해주세요
                    <br />
                    <span>(png, jpeg, jpg)</span>
                  </span>
                )}
                <input
                  type="file"
                  name="file"
                  id="edit-input-profile-img"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onChangeHandler}
                  className="edit-input"
                  // required
                  style={{
                    opacity: "0",
                    position: "absolute",
                    width: "0",
                    height: "0",
                  }}
                />
              </label>
              <button className="edit-button" type="submit">
                프로필 이미지 변경하기
              </button>
            </form>
          </div>
        </MyAccountStyle>
      </ContentStyle>
    </>
  );
}

import Navbar from "components/Navbar";
import { ContentStyle, MyAccountStyle } from "components/styled";
import { getAuth, updateEmail } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { authService } from "components/fbase/fbase";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "components/fbase/fbase";

export default function MyAccount() {
  const navigate = useNavigate();
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const [file, setFile] = useState();
  const [email, setEmail] = useState();
  const [originEmail, setOriginEmail] = useState();
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [nickname, setNickname] = useState();
  const [originNickname, setOriginNickname] = useState();
  const [nicknameDisabled, setNicknameDisabled] = useState(true);

  const onChangeHandler = (event) => {
    if (event.target.name == "file") {
      const image = event.target.files;
      setFile(image);
    } else if (event.target.name == "email") {
      setEmail(event.target.value);
    } else if (event.target.name == "nickname") {
      setNickname(event.target.value);
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

  const getData = async () => {
    try {
      if (getAuth().currentUser) {
        setOriginEmail(getAuth().currentUser.email);
        const docRef = doc(db, "users", getAuth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        setOriginNickname(docSnap.data().nickname);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFile(file);
    if (file) {
      preview();
    }
  }, [file]);

  useEffect(() => {
    setEmail(email);
    if (email == originEmail) {
      setEmailDisabled(true);
    } else {
      if (emailReg.test(email)) {
        setEmailDisabled(false);
      } else {
        setEmailDisabled(true);
      }
    }
  }, [email]);

  useEffect(() => {
    setNickname(nickname);
    if (nickname == originNickname) {
      setNicknameDisabled(true);
    } else {
      setNicknameDisabled(false);
    }
  }, [nickname]);

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
    } else if (event.target.name == "nickname") {
      try {
        const userRef = doc(db, "users", getAuth().currentUser.uid);
        await updateDoc(userRef, {
          nickname: nickname,
        });
        alert("닉네임이 변경되었어요!");
        navigate("/");
      } catch (e) {
        console.log(e);
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
              <button
                className="edit-button"
                disabled={emailDisabled}
                type="submit"
              >
                이메일 변경하기
              </button>
            </form>
            <form
              className="edit-form nickname"
              name="nickname"
              onSubmit={onSubmitHandler}
            >
              <h3 className="edit-target">닉네임</h3>
              <div>
                <input
                  className="edit-input"
                  type="text"
                  name="nickname"
                  onChange={onChangeHandler}
                  value={nickname}
                ></input>
              </div>
              <button className="edit-button" disabled={nicknameDisabled}>
                닉네임 변경하기
              </button>
            </form>
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

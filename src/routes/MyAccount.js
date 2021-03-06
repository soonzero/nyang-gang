import Navbar from "components/Navbar";
import { ContentStyle, MyAccountStyle } from "components/styled";
import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { authService } from "components/fbase/fbase";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "components/fbase/fbase";

export default function MyAccount() {
  const navigate = useNavigate();
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const [display, setDisplay] = useState(false);
  const [file, setFile] = useState();
  const [changeMode, setChangeMode] = useState();
  const [email, setEmail] = useState();
  const [originEmail, setOriginEmail] = useState();
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [nickname, setNickname] = useState();
  const [originNickname, setOriginNickname] = useState();
  const [nicknameDisabled, setNicknameDisabled] = useState(true);
  const [password, setPassword] = useState();

  const onChangeHandler = (event) => {
    if (event.target.name == "file") {
      const image = event.target.files;
      setFile(image);
    } else if (event.target.name == "email") {
      setEmail(event.target.value);
    } else if (event.target.name == "nickname") {
      setNickname(event.target.value);
    } else if (event.target.name == "password") {
      setPassword(event.target.value);
    }
  };

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
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setOriginEmail(user.email);
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          setOriginNickname(userSnap.data().nickname);
          if (display) {
            const target = document.querySelector(".click-here");
            target.style.backgroundImage = `url(${
              userSnap.data().profileimagelink
            })`;
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [display]);

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
    if (nickname && nickname.length > 0) {
      if (nickname == originNickname) {
        setNicknameDisabled(true);
      } else {
        setNicknameDisabled(false);
      }
    } else {
      setNicknameDisabled(true);
    }
  }, [nickname]);

  useEffect(() => {
    setPassword(password);
  }, [password]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    if (event.target.name == "email") {
      if (email.includes("admin")) {
        alert("???????????? 'admin' ?????? ???????????? ????????? ??? ????????????.");
      } else {
        updateEmail(auth.currentUser, email)
          .then(() => {
            alert("???????????? ??????????????????. ?????? ?????????????????????!");
            authService.signOut();
            sessionStorage.clear();
            navigate("/login");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else if (event.target.name == "profile-img") {
      if (file) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `users/${sessionStorage.getItem("uid")}/profile-image`
        );
        uploadBytes(storageRef, file[0]).then((snapshot) => {
          alert("????????? ???????????? ??????????????????!");
          alert(
            "????????? ???????????? ???????????? ?????? ??? ?????? ?????? ??? ????????? ????????? ??????????????????!"
          );
          navigate("/");
        });
      } else {
        alert("???????????? ?????????????????????!");
      }
    } else if (event.target.name == "nickname") {
      if (nickname && nickname.length > 0) {
        if (nickname.includes("?????????") || nickname.includes("admin")) {
          alert("???????????? '?????????', 'admin' ?????? ???????????? ????????? ??? ????????????.");
        } else {
          try {
            const userRef = doc(db, "users", getAuth().currentUser.uid);
            await updateDoc(userRef, {
              nickname: nickname,
            });
            alert("???????????? ??????????????????!");
            navigate("/");
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        alert("???????????? ???????????? ??????????????????");
      }
    } else if (event.target.name == "password") {
      if (password && password.length > 0) {
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        reauthenticateWithCredential(user, credential)
          .then(() => {
            setDisplay(true);
          })
          .catch((e) => {
            if (e.message.includes("wrong-password")) {
              alert("??????????????? ?????? ?????????????????????. ?????? ??????????????????.");
            }
          });
      } else {
        alert("??????????????? ??????????????????");
      }
    }
  };

  return (
    <>
      <Navbar auth subnav setting myaccount />
      <ContentStyle>
        <MyAccountStyle>
          {display ? (
            <>
              <div className="edit-header">
                <h2>??????????????????</h2>
                <Link to="/delete">
                  <span>?????? ??????</span>
                </Link>
              </div>
              <div className="edit-main">
                <form
                  className="edit-form email"
                  name="email"
                  onSubmit={onSubmitHandler}
                >
                  <h3 className="edit-target">?????? ?????????</h3>
                  {changeMode == "email" ? (
                    <>
                      <input
                        className="edit-input"
                        type="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={email}
                        placeholder="????????? ???????????? ??????????????????"
                      ></input>
                      <button
                        className="edit-button"
                        disabled={emailDisabled}
                        type="submit"
                      >
                        ????????? ???????????? ????????????
                      </button>
                    </>
                  ) : (
                    <div className="ex-container">
                      <span className="origin-container">
                        {originEmail && originEmail}
                      </span>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => setChangeMode("email")}
                      >
                        ????????? ??????
                      </button>
                    </div>
                  )}
                </form>
                <form
                  className="edit-form nickname"
                  name="nickname"
                  onSubmit={onSubmitHandler}
                >
                  <h3 className="edit-target">?????? ?????????</h3>
                  {changeMode == "nickname" ? (
                    <>
                      <div>
                        <input
                          className="edit-input"
                          type="text"
                          name="nickname"
                          onChange={onChangeHandler}
                          value={nickname}
                          placeholder="????????? ???????????? ??????????????????"
                        ></input>
                      </div>
                      <button
                        className="edit-button"
                        disabled={nicknameDisabled}
                      >
                        ????????? ??????????????? ????????????
                      </button>
                    </>
                  ) : (
                    <div className="ex-container">
                      <span className="origin-container">
                        {originNickname && originNickname}
                      </span>
                      <button
                        className="edit-button"
                        type="button"
                        onClick={() => setChangeMode("nickname")}
                      >
                        ????????? ??????
                      </button>
                    </div>
                  )}
                </form>
                <form
                  className="edit-form profile-img"
                  name="profile-img"
                  onSubmit={onSubmitHandler}
                >
                  <h3 className="edit-target">?????? ????????? ?????????</h3>
                  <label
                    className="image-preview"
                    htmlFor="edit-input-profile-img"
                  >
                    {file && file[0] ? null : (
                      <>
                        <div className="click-here"></div>
                        <span>
                          ????????? ?????? ????????? ?????????
                          <br />
                          ???????????? ??????????????????.
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      name="file"
                      id="edit-input-profile-img"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={onChangeHandler}
                      className="edit-input"
                      required
                    />
                  </label>
                  <button className="edit-button" type="submit">
                    ????????? ????????? ????????????
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="edit-header">
                <h2>???????????? ??????</h2>
              </div>
              <p className="reauth-desc">
                ???????????? ????????? ?????? ??????????????? ??????????????????
              </p>
              <form
                name="password"
                className="edit-form"
                onSubmit={onSubmitHandler}
              >
                <h3 className="edit-target">????????????</h3>
                <input
                  name="password"
                  className="edit-input"
                  type="password"
                  value={password}
                  onChange={onChangeHandler}
                />
                <button className="edit-button">???????????? ????????????</button>
              </form>
            </>
          )}
        </MyAccountStyle>
      </ContentStyle>
    </>
  );
}

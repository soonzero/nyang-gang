import { authService, db } from "components/fbase/fbase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { AuthStyle } from "components/styled";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "components/Navbar";
import SocialAuth from "components/SocialAuth";
import ProfileImage from "components/ProfileImage";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordReg =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!-_@#$%^&+=]).*$/;

  const [file, setFile] = useState();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState();
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [validPassword, setValidPassword] = useState();
  const [error, setError] = useState("");
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [pwConfirm, setPWConfirm] = useState(true);
  const [nickname, setNickname] = useState();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "password-check") {
      setPasswordCheck(value);
    } else if (name == "nickname") {
      setNickname(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email.length > 0 && password.length > 0 && passwordCheck.length > 0) {
      if (password == passwordCheck) {
        try {
          let data;
          data = await createUserWithEmailAndPassword(
            authService,
            email,
            password
          );
          await setDoc(doc(db, "users", data.user.uid), {
            nickname: nickname,
          });

          const storage = getStorage();
          const storageRef = ref(
            storage,
            `users/${data.user.uid}/profile-image`
          );
          uploadBytes(storageRef, file[0]).then((snapshot) => {
            console.log(snapshot);
          });
          setEmail("");
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("비밀번호를 확인해주세요");
        setPassword("");
      }
    }
  };

  const checkValid = () => {
    if (email.length > 0) {
      if (emailReg.test(email)) {
        setValidEmail(true);
        setEmailConfirm(true);
      } else {
        setValidEmail(false);
        setEmailConfirm(false);
      }
    } else {
      setValidEmail();
      setEmailConfirm(false);
    }

    if (password.length > 0) {
      if (passwordReg.test(password)) {
        setValidPassword(true);
        setPWConfirm(true);
      } else {
        setValidPassword(false);
        setPWConfirm(false);
      }

      if (passwordCheck.length > 0) {
        if (password == passwordCheck) {
          setError("");
        } else {
          setError("비밀번호가 일치하지 않아요");
        }
      }
    } else {
      setValidPassword();
      setPWConfirm(false);
    }
  };

  useEffect(() => {
    setEmail(email);
    setPassword(password);
    setPasswordCheck(passwordCheck);
    setNickname(nickname);
    checkValid();
  }, [email, password, passwordCheck, nickname]);

  return (
    <>
      <Navbar auth />
      <AuthStyle signup validEmail={validEmail} validPassword={validPassword}>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="form-title">회원가입</div>
          <div className="auth-sns signup">
            <div className="auth-sns-text">SNS 계정으로 회원가입</div>
            <SocialAuth />
          </div>
          <div className="form-container">
            <div className="form-inputs">
              <div className="form-confirm">
                <label className="input-label" htmlFor="email">
                  이메일
                </label>
                <input
                  id="email"
                  className="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChangeHandler}
                  placeholder="이메일"
                  required
                />
                <button
                  className="auth-button confirm"
                  type="button"
                  disabled={!emailConfirm}
                >
                  이메일 확인하기
                </button>
              </div>
              <div className="form-confirm">
                <label className="input-label" htmlFor="password">
                  비밀번호
                </label>
                <div
                  className={`password-text ${pwConfirm ? "valid" : "invalid"}`}
                >
                  {!validPassword && !pwConfirm
                    ? "⚠️ 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요"
                    : "✔️ 영문, 숫자, 특수문자를 포함하여 8자 이상 입력 완료"}
                </div>
                <input
                  id="password"
                  className="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangeHandler}
                  placeholder="비밀번호"
                  required
                />
                <label className="input-label" htmlFor="password-check">
                  비밀번호 확인
                </label>
                <input
                  id="password-check"
                  className="password-check"
                  name="password-check"
                  type="password"
                  value={passwordCheck}
                  onChange={onChangeHandler}
                  placeholder="비밀번호 확인"
                  required
                />
                <div className="confirm-text">{error}</div>
              </div>
              <div className="form-confirm">
                <label className="input-label" htmlFor="nickname">
                  닉네임
                </label>
                <input
                  id="nickname"
                  className="nickname"
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={onChangeHandler}
                  placeholder="닉네임"
                  required
                />
              </div>
              <div className="form-confirm">
                <ProfileImage file={file} setFile={setFile} />
              </div>
            </div>
            <button className="auth-button" type="submit">
              회원가입
            </button>
            <div className="auth-extra">
              <div className="extra-menu">
                이미 아이디가 있으신가요?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "underline", fontWeight: "600" }}
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </form>
      </AuthStyle>
    </>
  );
}

import { authService } from "components/fbase/fbase";
import { ReactComponent as Logo } from "images/nyang-gang.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthStyle } from "components/styled";
import SocialAuth from "components/SocialAuth";

export default function Login() {
  const navigate = useNavigate();

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordReg =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!-_@#$%^&+=]).*$/;
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState();
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    checkValid();
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      data = await signInWithEmailAndPassword(authService, email, password);
      sessionStorage.setItem(
        "accessToken",
        data.user.stsTokenManager.accessToken
      );
      sessionStorage.setItem(
        "refreshToken",
        data.user.stsTokenManager.refreshToken
      );
      sessionStorage.setItem("uid", data.user.uid);
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.emailVerified) {
            navigate("/");
          } else {
            if (window.confirm("지금 이메일 인증을 진행하실래요?")) {
              navigate("/verification");
            } else {
              navigate("/");
            }
          }
        }
      });
    } catch (e) {
      if (e.message.includes("user-not-found")) {
        alert("가입된 이메일이 없습니다. 이메일을 다시 한 번 확인해주세요.");
      } else if (e.message.includes("wrong-password")) {
        alert("비밀번호가 올바르지 않습니다. 다시 입력해주세요. ");
      }
    }
  };

  const checkValid = () => {
    if (email.length > 0) {
      if (emailReg.test(email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    } else {
      setValidEmail();
    }

    if (password.length >= 6) {
      if (passwordReg.test(password)) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    } else if (password.length == 0) {
      setValidPassword();
    } else {
      setValidPassword(false);
    }
  };

  useEffect(() => {
    setEmail(email);
    setPassword(password);
    checkValid();
  }, [email, password]);

  return (
    <>
      <AuthStyle validEmail={validEmail} validPassword={validPassword}>
        <form className="auth-form" onSubmit={onSubmit}>
          <Link to="/">
            <section className="form-logo">
              <span className="logo-img">
                <Logo color="#f57977" />
              </span>
              <h1 className="logo-text">냥갱</h1>
            </section>
          </Link>
          <div className="form-container">
            <div className="form-inputs">
              <input
                className="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                placeholder="이메일"
                required
              />
              <input
                className="password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="비밀번호"
                required
              />
            </div>
            <button className="auth-button" type="submit">
              로그인
            </button>
            <div className="auth-extra">
              <span className="extra-menu">
                <Link to="/">비밀번호 재설정</Link>
              </span>
              <span className="extra-menu">
                <Link to="/signup">회원가입</Link>
              </span>
            </div>
          </div>
          <div className="auth-sns login">
            <div className="auth-sns-text">SNS 계정으로 간편 로그인</div>
            <SocialAuth />
          </div>
        </form>
      </AuthStyle>
    </>
  );
}

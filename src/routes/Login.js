import { authService } from "components/fbase/fbase";
import Navbar from "components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;

  .auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    width: 100%;
    height: 100%;
    max-width: 568px;
    max-height: 405px;
    box-sizing: border-box;
  }

  .form-title {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 12px;
    }
  }

  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-inputs {
    margin-right: 20px;

    input {
      width: 100%;
      border: 2px solid #ebebeb;
      font-size: 1rem;
      margin: 0 0 6px 0;
      outline: none;
      background-color: transparent;
      padding: 10px 12px;
      border-radius: 8px;
      box-sizing: border-box;

      &:last-child {
        margin-bottom: 0;
      }
    }

    input.email {
      border: ${(props) =>
        props.validEmail == false
          ? "2px solid grey"
          : props.validEmail == true
          ? "2px solid #f57977"
          : "2px solid #ebebeb"};
    }

    input.password {
      border: ${(props) =>
        props.validPassword == false
          ? "2px solid grey"
          : props.validPassword == true
          ? "2px solid #f57977"
          : "2px solid #ebebeb"};
    }
  }

  .auth-button {
    background-color: #f57977;
    padding: 15px 30px;
    font-size: 1rem;
    height: 100%;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    word-break: keep-all;
    box-sizing: border-box;
  }

  & > div {
    & > button {
      background-color: white;
      color: black;
      padding: 10px 12px;
      margin-bottom: 6px;
      border-radius: 8px;
      font-size: 1rem;
      border: none;
      width: 100%;
      cursor: pointer;
      box-sizing: border-box;
    }

    & > button:first-child {
      background-color: #4285f4;
      color: white;
    }

    & > button:nth-child(2) {
      background-color: black;
      color: white;
    }

    & > button:last-child {
      background-color: #fee500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
`;

export default function Login() {
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
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
      console.log(data);
    } catch (error) {
      alert(error.message);
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
      setValidPassword(true);
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
      <Navbar auth />
      <StContainer validEmail={validEmail} validPassword={validPassword}>
        <form className="auth-form" onSubmit={onSubmit}>
          <section className="form-title">
            <h1>로그인하기</h1>
          </section>
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
          </div>
        </form>
      </StContainer>
    </>
  );
}

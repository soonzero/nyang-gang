import { authService } from "components/fbase/fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  & > form {
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

    & > section {
      margin-bottom: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & > h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 12px;
      }

      & > span {
        cursor: pointer;
      }
    }

    & > input {
      border: 2px solid #ebebeb;
      font-size: 1rem;
      margin: 0 0 6px 0;
      outline: none;
      background-color: transparent;
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      box-sizing: border-box;
    }

    & > input[type="submit"] {
      background-color: #0066ff;
      border: none;
      color: white;
      width: 100%;
      margin-top: 50px;
      margin-bottom: 25px;
      font-weight: 600;
      cursor: pointer;
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
  }
`;

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

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
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <StContainer>
      <form onSubmit={onSubmit}>
        <section>
          <h1>{newAccount ? "회원가입" : "로그인"}</h1>
          <span onClick={() => setNewAccount((prev) => !prev)}>
            {newAccount ? "로그인" : "회원가입"}
          </span>
        </section>
        <input
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        <div>
          <button type="button" value="Sign in with Google">
            Sign in with Google
          </button>
          <button type="button"> Sign in with Apple</button>
          <button type="button">Login with Kakao</button>
        </div>
      </form>
    </StContainer>
  );
}

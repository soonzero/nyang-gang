import Navbar from "components/Navbar";
import { ContentStyle, PasswordStyle } from "components/styled";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePW() {
  const navigate = useNavigate();
  const passwordReg =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!-_@#$%^&+=]).*$/;

  const [exPW, setExPW] = useState();
  const [pw, setPW] = useState();
  const [confirm, setConfirm] = useState();
  const [validPW, setValidPW] = useState();
  const [validConfirm, setValidConfirm] = useState();

  const onChangeHandler = (event) => {
    if (event.target.name == "pw") {
      setPW(event.target.value);
    } else if (event.target.name == "confirm") {
      setConfirm(event.target.value);
    } else if (event.target.name == "ex-pw") {
      setExPW(event.target.value);
    }
  };

  const checkValid = () => {
    if (pw) {
      if (passwordReg.test(pw)) {
        setValidPW(true);
        if (confirm) {
          if (pw == confirm) {
            setValidConfirm(true);
          } else {
            setValidConfirm(false);
          }
        } else {
          setValidConfirm();
        }
      } else {
        setValidPW(false);
        if (confirm) {
          if (pw == confirm) {
            setValidConfirm(true);
          } else {
            setValidConfirm(false);
          }
        } else {
          setValidConfirm();
        }
      }
    } else {
      setValidPW();
      if (confirm) {
        if (pw == confirm) {
          setValidConfirm(true);
        } else {
          setValidConfirm(false);
        }
      } else {
        setValidConfirm();
      }
    }
  };

  useEffect(() => {
    setExPW(exPW);
    setPW(pw);
    setConfirm(confirm);
    checkValid();
  }, [pw, confirm]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (validPW && validConfirm) {
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, exPW);
      await reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, pw)
            .then(() => {
              alert(
                "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요!"
              );
              auth.signOut();
              sessionStorage.clear();
              navigate("/login");
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          if (e.message.includes("wrong-password")) {
            alert("기존 비밀번호를 잘못 입력하셨습니다. 다시 시도해주세요.");
          }
        });
    }
  };
  return (
    <>
      <Navbar auth setting password />
      <ContentStyle>
        <PasswordStyle>
          <form onSubmit={onSubmitHandler}>
            <h2 className="header">비밀번호 변경</h2>
            <div className="inputs-container">
              <h3 className="pw-title">기존 비밀번호</h3>
              <div className="input-container">
                <input
                  name="ex-pw"
                  type="password"
                  value={exPW}
                  onChange={onChangeHandler}
                />
                <span className="error-msg"> </span>
              </div>
              <h3 className="pw-title">새 비밀번호</h3>
              <span className="pw-desc">
                영문과 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
              </span>
              <div className="input-container">
                <input
                  name="pw"
                  type="password"
                  value={pw}
                  onChange={onChangeHandler}
                ></input>
                <span className="error-msg">
                  {validPW == true
                    ? ""
                    : validPW == false
                    ? "비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다."
                    : ""}
                </span>
              </div>
              <h3 className="pw-title">새 비밀번호 확인</h3>
              <div className="input-container">
                <input
                  name="confirm"
                  type="password"
                  value={confirm}
                  onChange={onChangeHandler}
                ></input>
                <span className="error-msg">
                  {validConfirm == true
                    ? ""
                    : validConfirm == false
                    ? "비밀번호가 일치하지 않습니다."
                    : ""}
                </span>
              </div>
            </div>
            <button type="submit" className="change-button">
              비밀번호 변경
            </button>
          </form>
        </PasswordStyle>
      </ContentStyle>
    </>
  );
}

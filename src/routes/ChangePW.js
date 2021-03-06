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
                "??????????????? ??????????????? ?????????????????????. ?????? ?????????????????????!"
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
            alert("?????? ??????????????? ?????? ?????????????????????. ?????? ??????????????????.");
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
            <h2 className="header">???????????? ??????</h2>
            <div className="inputs-container">
              <h3 className="pw-title">?????? ????????????</h3>
              <div className="input-container">
                <input
                  name="ex-pw"
                  type="password"
                  value={exPW}
                  onChange={onChangeHandler}
                />
                <span className="error-msg"> </span>
              </div>
              <h3 className="pw-title">??? ????????????</h3>
              <span className="pw-desc">
                ??????, ?????? ?????? 8??? ???????????? ??????????????????.
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
                    ? "????????? ??????????????????."
                    : ""}
                </span>
              </div>
              <h3 className="pw-title">??? ???????????? ??????</h3>
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
                    ? "??????????????? ???????????? ????????????."
                    : ""}
                </span>
              </div>
            </div>
            <button type="submit" className="change-button">
              ???????????? ??????
            </button>
          </form>
        </PasswordStyle>
      </ContentStyle>
    </>
  );
}

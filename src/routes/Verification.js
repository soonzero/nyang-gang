import Loading from "components/Loading";
import Navbar from "components/Navbar";
import { ContentStyle, PasswordStyle } from "components/styled";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { useState, useEffect } from "react";

export default function Verification() {
  let didCancel = false;
  const [verified, setVerified] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (!didCancel) {
            if (user.emailVerified) {
              setVerified(true);
            } else {
              setVerified(false);
            }
          }
          setIsLoading(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      sendEmailVerification(auth.currentUser).then(() => {
        alert(
          `${auth.currentUser.email}으로 인증 메일을 발송했어요. 인증을 완료해주세요!`
        );
      });
    } catch (e) {
      if (e.code == "auth/too-many-request") {
        alert(
          "인증 메일이 이미 발송되었어요. 메일함에 인증 메일이 없다면, 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  useEffect(() => {
    getData();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <Navbar auth setting verification />
      <ContentStyle>
        <PasswordStyle>
          {!isLoading ? (
            <>
              <form onSubmit={onSubmitHandler}>
                <h2 className="header">이메일 인증</h2>
                <div className="inputs-container">
                  <h3 className="pw-title">
                    {verified ? "인증 완료" : "미인증"} 상태입니다.
                  </h3>
                  <span className="pw-desc">
                    {!verified && "아래 버튼을 눌러 인증을 진행해주세요"}
                  </span>
                </div>
                <button
                  type="submit"
                  className="change-button"
                  disabled={verified}
                >
                  {verified ? "이메일 인증 완료" : "이메일 인증 메일 보내기"}
                </button>
              </form>
            </>
          ) : (
            <Loading notext />
          )}
        </PasswordStyle>
      </ContentStyle>
    </>
  );
}

import Navbar from "components/Navbar";
import { ContentStyle, PasswordStyle } from "components/styled";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPW() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const onChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "비밀번호를 재설정할 수 있도록 이메일을 보냈어요!\n이메일 확인 후 비밀번호를 재설정해주세요."
        );
        navigate("/login");
      })
      .catch((e) => {
        if (e.code == "auth/user-not-found") {
          alert("가입된 이메일이 없습니다. 이메일을 다시 한 번 확인해주세요.");
        }
      });
  };

  useEffect(() => {
    setEmail(email);
  }, [email]);
  return (
    <>
      <Navbar auth />
      <ContentStyle>
        <PasswordStyle>
          <form onSubmit={onSubmitHandler}>
            <h2 className="header">이메일 입력</h2>
            <div className="inputs-container">
              <h3 className="pw-title">
                비밀번호 재설정을 위해 사용했던 이메일을 입력해주세요
              </h3>
              <input name="email" type="email" onChange={onChangeHandler} />
            </div>
            <button type="submit" className="change-button">
              비밀번호 재설정
            </button>
          </form>
        </PasswordStyle>
      </ContentStyle>
    </>
  );
}

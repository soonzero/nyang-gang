import Navbar from "components/Navbar";
import { ContentStyle, DeleteAccountStyle } from "components/styled";
import { deleteUser, getAuth } from "firebase/auth";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { deleteObject, ref, getStorage } from "firebase/storage";
import { db } from "components/fbase/fbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const onChangeHandler = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const deleteAccount = async () => {
    if (checked) {
      if (
        window.confirm(
          "회원 탈퇴 시 복구할 수 없습니다. 계속 진행하시겠습니까?"
        )
      ) {
        const auth = getAuth();
        const user = auth.currentUser;
        try {
          await setDoc(doc(db, "users", user.uid), {
            status: "deleted",
          });
          await deleteUser(user);
          sessionStorage.clear();
          navigate("/");
        } catch (e) {
          console.log(e);
        }
      } else {
        navigate("/myaccount");
      }
    } else {
      alert("내용을 꼭 확인해주세요.");
    }
  };

  return (
    <>
      <Navbar auth />
      <ContentStyle>
        <DeleteAccountStyle checked={checked}>
          <h2 className="title">회원 탈퇴</h2>
          <h3 className="desc">
            회원 탈퇴 신청에 앞서 아래 내용을 꼭 확인해주세요.
          </h3>
          <div className="main">
            <h3 className="header">회원 탈퇴 시 처리될 내용</h3>
            <ol className="content">
              <li>
                냥갱 포인트 및 쿠폰은 소멸되며{" "}
                <strong>환불되지 않습니다.</strong>
              </li>
              <li>
                냥갱 <strong>구매 정보가 삭제됩니다.</strong>
              </li>
              <li>
                소비자의 개인정보는 <strong>회원 탈퇴 시 즉각 파기</strong>
                됩니다.
              </li>
            </ol>
            <h3 className="header">회원 탈퇴 시 게시물 관리</h3>
            <p className="content">
              회원탈퇴 후 냥갱 서비스에 입력한 게시물 및 댓글은 삭제되지
              않습니다. 회원 정보 삭제로 인해 작성자 본인을 확인할 수 없으므로
              게시물 편집 및 삭제 처리가 원천적으로 불가능 합니다.{" "}
              <strong>
                게시물 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제 하신 후
              </strong>
              에 탈퇴를 신청하시길 바랍니다.
            </p>
            <h3 className="header">회원 탈퇴 후 재가입 규정</h3>
            <p className="content">
              탈퇴 후에도 언제든지 재가입이 가능합니다. 다만, 기존에 보유하던
              냥갱 포인트와 쿠폰은 소멸되기 때문에 탈퇴 회원이 재가입하더라도{" "}
              <strong>양도되지 않습니다.</strong>
            </p>
          </div>
          <div className="confirm-wrapper">
            <label className="confirm-container">
              <div className="check-box">
                <input
                  type="checkbox"
                  className="confirm checked"
                  id="confirm"
                  onChange={onChangeHandler}
                />
                <span className="check-container">
                  <svg width="1em" height="1em" viewBox="0 0 16 16">
                    <path
                      fill="white"
                      d="M6.185 10.247l7.079-7.297 1.435 1.393-8.443 8.703L1.3 8.432l1.363-1.464z"
                    ></path>
                  </svg>
                </span>
              </div>
              <span>
                위 내용을 모두 확인하였습니다.
                <span>필수</span>
              </span>
            </label>
          </div>
          <div className="delete-button">
            <button className="delete" type="button" onClick={deleteAccount}>
              탈퇴하기
            </button>
            <button
              className="cancel"
              type="button"
              onClick={() => navigate("/")}
            >
              취소하기
            </button>
          </div>
        </DeleteAccountStyle>
      </ContentStyle>
    </>
  );
}

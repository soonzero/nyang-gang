import React, { useState, useEffect } from "react";
import ProfilePanel from "components/ProfilePanel";
import Navbar from "components/Navbar";
import { AdoptionStyle, ContentStyle, PanelStyle } from "components/styled";
import Feed from "components/Feed";
import TodayPanel from "components/TodayPanel";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function Adoption() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [nickname, setNickname] = useState();
  const [imageUrl, setImageUrl] = useState();

  if (sessionStorage.getItem("uid")) {
    const storage = getStorage();
    getDownloadURL(
      ref(storage, `users/${sessionStorage.getItem("uid")}/profile-image`)
    )
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("uid")
    ) {
      setIsLoggedIn(true);
    } else {
      alert("로그인 후 이용 가능해요!");
      navigate("/login");
    }
  });

  return (
    <>
      <Navbar />
      <ContentStyle>
        <AdoptionStyle>
          <div className="part side">
            <PanelStyle>
              <ProfilePanel
                nickname={nickname}
                setNickname={setNickname}
                image={imageUrl}
              />
            </PanelStyle>
            <PanelStyle>
              <TodayPanel />
            </PanelStyle>
          </div>
          <div className="part main">
            <Feed nickname={nickname} image={imageUrl} />
          </div>
        </AdoptionStyle>
      </ContentStyle>
    </>
  );
}

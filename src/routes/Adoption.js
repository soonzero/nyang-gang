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
  const [imageUrl, setImageUrl] = useState();

  if (sessionStorage.getItem("uid")) {
    const storage = getStorage();
    getDownloadURL(
      ref(storage, `users/${sessionStorage.getItem("uid")}/profile-image.png`)
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
              <ProfilePanel image={imageUrl} />
            </PanelStyle>
            <PanelStyle>
              <TodayPanel />
            </PanelStyle>
          </div>
          <div className="part main">
            <Feed />
          </div>
        </AdoptionStyle>
      </ContentStyle>
    </>
  );
}

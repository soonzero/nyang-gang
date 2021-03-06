import React, { useState, useEffect } from "react";
import ProfilePanel from "components/ProfilePanel";
import Navbar from "components/Navbar";
import { AdoptionStyle, ContentStyle, PanelStyle } from "components/styled";
import Feed from "components/Feed";
import TodayPanel from "components/TodayPanel";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "components/fbase/fbase";

export default function Adoption() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState();
  const [imageUrl, setImageUrl] = useState();

  const getData = async (user) => {
    if (user.uid) {
      const storage = getStorage();
      getDownloadURL(ref(storage, `users/${user.uid}/profile-image`))
        .then((url) => {
          setImageUrl(url);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const setAuth = async (user, auth) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (user.emailVerified) {
      setIsLoggedIn(true);
    } else {
      if (userSnap.data().auth) {
        setIsLoggedIn(true);
      } else {
        alert("이메일 인증 후 사용 가능해요!");
        navigate("/verification");
      }
    }
  };

  useEffect(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setAuth(user, auth);
        await getData(user);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <ContentStyle>
        {isLoggedIn && (
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
        )}
      </ContentStyle>
    </>
  );
}

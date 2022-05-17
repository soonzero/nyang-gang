import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import Navbar from "components/Navbar";
import React, { useState, useEffect } from "react";
import { db } from "components/fbase/fbase";
import { ContentStyle, FavoriteStyle } from "components/styled";
import { ReactComponent as Delete } from "images/trashcan.svg";
import { useDispatch, useSelector } from "react-redux";
import Kakaomap from "components/Kakaomap";
import Loading from "components/Loading";

export default function Favorite() {
  let didCancel = false;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const getData = async () => {
    setIsLoading(true);
    const docRef = doc(db, "users", sessionStorage.getItem("uid"));
    const docSnap = await getDoc(docRef);
    if (!didCancel) {
      dispatch({ type: "SET_FAVORITES", data: docSnap.data() });
      setIsLoading(false);
    }
  };

  const deleteContent = async (event, item) => {
    try {
      const target = event.currentTarget.getAttribute("name");
      const userRef = doc(db, "users", sessionStorage.getItem("uid"));
      if (target == "hospital" || target == "pharmacy") {
        await updateDoc(userRef, {
          [target]: arrayRemove({
            name: item.name,
            date: item.date,
            zip: item.zip,
            address: item.address,
            tel: item.tel,
            lat: item.lat,
            lon: item.lon,
          }),
        });
      } else {
        await updateDoc(userRef, {
          [target]: arrayRemove({
            name: item.name,
            zip: item.zip,
            address: item.address,
            tel: item.tel,
            lat: item.lat,
            lon: item.lon,
          }),
        });
      }
      dispatch({
        type: "DELETE_FAVORITE",
        data: { type: target, content: item },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const favoriteList = useSelector((state) => state.manageFavorite);

  useEffect(() => {
    getData();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <Navbar favorite subnav filter={filter} setFilter={setFilter} />
      {!isLoading ? (
        <>
          <ContentStyle>
            <FavoriteStyle>
              {(filter == "all" || filter == "hospital") && (
                <div className="container hospital">
                  <h1 className="header">병원</h1>
                  <div className="contents">
                    {(favoriteList.hospital &&
                      favoriteList.hospital.length == 0) ||
                    favoriteList.hospital == undefined ? (
                      <div className="no-content">즐겨찾기 없음</div>
                    ) : (
                      favoriteList.hospital.map((i) => {
                        return (
                          <div className="content">
                            <div className="content-header">
                              <h3 className="name">{i.name}</h3>
                              <span
                                name="hospital"
                                className="delete"
                                onClick={(event) => deleteContent(event, i)}
                              >
                                <Delete />
                              </span>
                            </div>
                            <p className="address">{i.address}</p>
                            <span className="tel">{i.tel}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
              {(filter == "all" || filter == "pharmacy") && (
                <div className="container pharmacy">
                  <h1 className="header">약국</h1>
                  <div className="contents">
                    {(favoriteList.pharmacy &&
                      favoriteList.pharmacy.length == 0) ||
                    favoriteList.pharmacy == undefined ? (
                      <div className="no-content">즐겨찾기 없음</div>
                    ) : (
                      favoriteList.pharmacy.map((i) => {
                        return (
                          <div className="content">
                            <div className="content-header">
                              <h3 className="name">{i.name}</h3>
                              <span
                                name="pharmacy"
                                className="delete"
                                onClick={(event) => deleteContent(event, i)}
                              >
                                <Delete />
                              </span>
                            </div>
                            <p className="address">{i.address}</p>
                            <span className="tel">{i.tel}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
              {(filter == "all" || filter == "shelter") && (
                <div className="container shelter">
                  <h1 className="header">보호소</h1>
                  <div className="contents">
                    {(favoriteList.shelter &&
                      favoriteList.shelter.length == 0) ||
                    favoriteList.shelter == undefined ? (
                      <div className="no-content">즐겨찾기 없음</div>
                    ) : (
                      favoriteList.shelter.map((i) => {
                        return (
                          <div className="content">
                            <div className="content-header">
                              <h3 className="name">{i.name}</h3>
                              <span
                                name="shelter"
                                className="delete"
                                onClick={(event) => deleteContent(event, i)}
                              >
                                <Delete />
                              </span>
                            </div>
                            <p className="address">{i.address}</p>
                            <span className="tel">{i.tel}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </FavoriteStyle>
          </ContentStyle>
          <ContentStyle>
            <div className="full-container">
              <Kakaomap favorite data={favoriteList} />
            </div>
          </ContentStyle>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { ReactComponent as Check } from "images/check.svg";
import { ReactComponent as FilledStar } from "images/star-filled.svg";
import { ReactComponent as EmptyStar } from "images/star-empty.svg";
import Pagination from "./Pagination";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./fbase/fbase";
import { ListStyle } from "./styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function List(props) {
  let didCancel = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.manageFavorite);

  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const filter = async (code, num, pageIndex = 1) => {
    let filteredArray;
    if (!didCancel) {
      if (code == "") {
        setAllData(props.data);
        filteredArray = props.data.slice(
          num * (pageIndex - 1),
          num * pageIndex
        );
      } else {
        filteredArray = await props.data.filter((d) => d.SIGUN_CD == code);
        setAllData(filteredArray);
        filteredArray = filteredArray.slice(
          num * (pageIndex - 1),
          num * pageIndex
        );
      }
      setFilteredData(filteredArray);
      compareLists(filteredArray);
      setIsLoading(false);
    }
  };

  const updateFilter = () => {
    if (props.city != undefined) {
      filter(props.city, props.number, page);
    } else {
      filter("", props.number, page);
    }
  };

  const manageWishlist = async (event, item) => {
    const target = event.currentTarget;
    if (sessionStorage.getItem("uid") == null) {
      alert("로그인을 먼저 해주세요!");
      navigate("/login");
    } else {
      try {
        const obj = target.getAttribute("name");
        const userRef = doc(db, "users", sessionStorage.getItem("uid"));
        let userSnap = await getDoc(userRef);
        let userObjSnap = userSnap.data()[obj];
        let search;
        // firestore에 해당 즐겨찾기 카테고리가 없으면 추가
        if (userObjSnap == undefined) {
          await setDoc(
            userRef,
            {
              [obj]: [],
            },
            {
              merge: true,
            }
          );
          // 변경된 이후에 새로운 정보를 받아와야 함
          userSnap = await getDoc(userRef);
          userObjSnap = userSnap.data()[obj];
        }

        // hospital이나 pharmacy를 선택했을 때
        if (obj == "hospital" || obj == "pharmacy") {
          // 선택한 카테고리에 추가된 즐겨찾기 업체가 뭐라도 있을 때
          // 내가 선택한 업체가 그 카테고리 안에 있는 지의 여부 확인하는 배열
          search = await userObjSnap.filter(
            (i) => i.name == item.BIZPLC_NM && i.date == item.LICENSG_DE
          );
        } else if (obj == "shelter") {
          search = await userObjSnap.filter((i) => i.name == item.ENTRPS_NM);
        }
        // 1개라도 있으면
        if (search.length > 0) {
          // 삭제하기
          await updateDoc(userRef, {
            [obj]: arrayRemove({
              name: obj == "shelter" ? item.ENTRPS_NM : item.BIZPLC_NM,
              date: obj == "shelter" ? item.SUM_YY : item.LICENSG_DE,
              zip: item.REFINE_ZIP_CD,
              address: item.REFINE_ROADNM_ADDR,
              tel:
                obj == "shelter" ? item.ENTRPS_TELNO : item.LOCPLC_FACLT_TELNO,
              lat: item.REFINE_WGS84_LAT,
              lon: item.REFINE_WGS84_LOGT,
            }),
          });
          dispatch({
            type: "DELETE_FAVORITE",
            data: {
              type: obj,
              content: {
                name: obj == "shelter" ? item.ENTRPS_NM : item.BIZPLC_NM,
                date: obj == "shelter" ? item.SUM_YY : item.LICENSG_DE,
                zip: item.REFINE_ZIP_CD,
                address: item.REFINE_ROADNM_ADDR,
                tel:
                  obj == "shelter"
                    ? item.ENTRPS_TELNO
                    : item.LOCPLC_FACLT_TELNO,
                lat: item.REFINE_WGS84_LAT,
                lon: item.REFINE_WGS84_LOGT,
              },
            },
          });
          // 없으면?
        } else {
          // 추가하기
          await updateDoc(userRef, {
            [obj]: arrayUnion({
              name: obj == "shelter" ? item.ENTRPS_NM : item.BIZPLC_NM,
              date: obj == "shelter" ? item.SUM_YY : item.LICENSG_DE,
              zip: item.REFINE_ZIP_CD,
              address: item.REFINE_ROADNM_ADDR,
              tel:
                obj == "shelter" ? item.ENTRPS_TELNO : item.LOCPLC_FACLT_TELNO,
              lat: item.REFINE_WGS84_LAT,
              lon: item.REFINE_WGS84_LOGT,
            }),
          });
          dispatch({
            type: "ADD_FAVORITE",
            data: {
              type: obj,
              content: {
                name: obj == "shelter" ? item.ENTRPS_NM : item.BIZPLC_NM,
                date: obj == "shelter" ? item.SUM_YY : item.LICENSG_DE,
                zip: item.REFINE_ZIP_CD,
                address: item.REFINE_ROADNM_ADDR,
                tel:
                  obj == "shelter"
                    ? item.ENTRPS_TELNO
                    : item.LOCPLC_FACLT_TELNO,
                lat: item.REFINE_WGS84_LAT,
                lon: item.REFINE_WGS84_LOGT,
              },
            },
          });
        }

        updateFilter();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const compareLists = async (array) => {
    if (favorites && props.hospital && favorites.hospital) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < favorites.hospital.length; j++) {
          if (
            array[i].BIZPLC_NM == favorites.hospital[j].name &&
            array[i].REFINE_ROADNM_ADDR == favorites.hospital[j].address
          ) {
            array[i].FAVORITE = true;
          }
        }
      }
    } else if (favorites && props.pharmacy && favorites.pharmacy) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < favorites.pharmacy.length; j++) {
          if (
            array[i].BIZPLC_NM == favorites.pharmacy[j].name &&
            array[i].REFINE_ROADNM_ADDR == favorites.pharmacy[j].address
          ) {
            array[i].FAVORITE = true;
          }
        }
      }
    } else if (favorites && props.shelter && favorites.shelter) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < favorites.shelter.length; j++) {
          if (
            array[i].BIZPLC_NM == favorites.shelter[j].name &&
            array[i].REFINE_ROADNM_ADDR == favorites.shelter[j].address
          ) {
            array[i].FAVORITE = true;
          }
        }
      }
    }
  };

  const getFavorites = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        dispatch({ type: "SET_FAVORITES", data: docSnap.data() });
      }
      if (!didCancel) {
        updateFilter();
      }
    });
  };

  useEffect(() => {
    getFavorites();

    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (!props.isLoading) {
      updateFilter();
    }
  }, [props.isLoading, props.city, props.number, page, favorites]);

  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData]);

  return (
    <ListStyle>
      {!isLoading ? (
        <>
          <div className="list-box">
            {(props.hospital || props.pharmacy) &&
              filteredData.map((item, index) => {
                return (
                  <div
                    key={`${item.BIZPLC_NM} ${item.LICENSG_DE}`}
                    className="list"
                    onClick={() =>
                      props.setCenter({
                        lat: item.REFINE_WGS84_LAT,
                        lon: item.REFINE_WGS84_LOGT,
                      })
                    }
                  >
                    <h3 className="name">{item.BIZPLC_NM}</h3>
                    <p className="address">{`[${item.REFINE_ZIP_CD}] ${item.REFINE_ROADNM_ADDR}`}</p>
                    <p className="tel">{item.LOCPLC_FACLT_TELNO}</p>
                    <button
                      name={`${
                        props.pharmacy
                          ? "pharmacy"
                          : props.hospital
                          ? "hospital"
                          : ""
                      }`}
                      className="star"
                      index={index}
                      onClick={(event) => manageWishlist(event, item)}
                    >
                      {item.FAVORITE == true ? (
                        <FilledStar
                          fill="#FFCB00"
                          className="icon star favorite"
                        />
                      ) : (
                        <EmptyStar className="icon star" />
                      )}
                    </button>
                  </div>
                );
              })}
            {props.shelter &&
              filteredData.map((item) => {
                return (
                  <div
                    key={`${item.ENTRPS_NM} ${item.SIGUN_CD}`}
                    className="list"
                    onClick={() =>
                      props.setCenter({
                        lat: item.REFINE_WGS84_LAT,
                        lon: item.REFINE_WGS84_LOGT,
                      })
                    }
                  >
                    <h3 className="name">
                      {item.CONTRACT_PERD == "직영" && (
                        <span className="check">
                          <Check className="icon check" />
                        </span>
                      )}
                      {item.ENTRPS_NM}
                    </h3>

                    <p className="address">{`[${item.REFINE_ZIP_CD}] ${item.REFINE_ROADNM_ADDR}`}</p>
                    <p className="tel">{item.ENTRPS_TELNO}</p>
                    <button
                      name="shelter"
                      className="star"
                      onClick={(event) => manageWishlist(event, item)}
                    >
                      {item.FAVORITE == true ? (
                        <FilledStar
                          fill="#FFCB00"
                          className="icon star favorite"
                        />
                      ) : (
                        <EmptyStar className="icon star" />
                      )}
                    </button>
                  </div>
                );
              })}
          </div>
          <Pagination
            data={allData}
            number={props.number}
            page={page}
            setPage={setPage}
          />
        </>
      ) : null}
    </ListStyle>
  );
}

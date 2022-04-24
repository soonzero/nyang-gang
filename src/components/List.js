import React, { useEffect, useState } from "react";
import { ReactComponent as FilledStar } from "images/star-filled.svg";
import { ReactComponent as EmptyStar } from "images/star-empty.svg";
import Pagination from "./Pagination";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./fbase/fbase";
import { ListStyle } from "./styled";
import { useNavigate } from "react-router-dom";

export default function List(props) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const filter = async (code, num, pageIndex = 1) => {
    let filteredArray;
    if (code == "") {
      setAllData(props.data);
      filteredArray = props.data.slice(num * (pageIndex - 1), num * pageIndex);
    } else {
      filteredArray = await props.data.filter((d) => d.SIGUN_CD == code);
      setAllData(filteredArray);
      filteredArray = filteredArray.slice(
        num * (pageIndex - 1),
        num * pageIndex
      );
    }
    // console.log(filteredArray);
    setFilteredData(filteredArray);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!props.isLoading) {
      if (props.city != undefined) {
        filter(props.city, props.number, page);
      } else {
        filter("", props.number, page);
      }
    }
  }, [props.isLoading, props.city, props.number, page]);

  const manageWishlist = async (item) => {
    if (sessionStorage.getItem("uid") == null) {
      alert("로그인을 먼저 해주세요!");
      navigate("/login");
    } else {
      try {
        const usersRef = await getDocs(collection(db, "users"));
        if (usersRef.docs.length == 0) {
          await setDoc(doc(db, "users", sessionStorage.getItem("uid")), {
            wishlist: [],
          });
        }
        const userRef = doc(db, "users", sessionStorage.getItem("uid"));
        const userSnap = await getDoc(userRef);
        const userWishlist = await userSnap.data().wishlist;
        const searchWishlist = await userWishlist.filter(
          (i) => i.name == item.BIZPLC_NM && i.date == item.LICENSG_DE
        );
        if (searchWishlist.length > 0) {
          await updateDoc(userRef, {
            wishlist: arrayRemove({
              name: item.BIZPLC_NM,
              date: item.LICENSG_DE,
              zip: item.REFINE_ZIP_CD,
              address: item.REFINE_ROADNM_ADDR,
              tel: item.LOCPLC_FACLT_TELNO,
            }),
          });
        } else {
          await updateDoc(userRef, {
            wishlist: arrayUnion({
              name: item.BIZPLC_NM,
              date: item.LICENSG_DE,
              zip: item.REFINE_ZIP_CD,
              address: item.REFINE_ROADNM_ADDR,
              tel: item.LOCPLC_FACLT_TELNO,
            }),
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ListStyle>
      {!isLoading ? (
        <>
          <div className="list-box">
            {filteredData.map((item) => {
              return (
                <div
                  key={`${item.BIZPLC_NM} ${item.LICENSG_DE}`}
                  className="list"
                >
                  <h3 className="hosptl-name">{item.BIZPLC_NM}</h3>
                  <p className="hosptl-address">{`[${item.REFINE_ZIP_CD}] ${item.REFINE_ROADNM_ADDR}`}</p>
                  <p className="hosptl-tel">{item.LOCPLC_FACLT_TELNO}</p>
                  <button
                    className="hosptl-save"
                    onClick={() => manageWishlist(item)}
                  >
                    {/* <FilledStar fill="#FFCB00" /> */}
                    <EmptyStar className="save" />
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

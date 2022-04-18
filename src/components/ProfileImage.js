import React, { useEffect, useState } from "react";

export default function ProfileImage(props) {
  const onChangeHandler = async (event) => {
    const image = event.target.files;
    props.setFile(image);
  };

  const preview = () => {
    const container = document.querySelector(".image-preview");
    if (props.file && props.file[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        container.style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(props.file[0]);
    } else {
      container.style.backgroundImage = "none";
    }
  };

  useEffect(() => {
    props.setFile(props.file);
    preview();

    // return () => preview();
  }, [props.file]);

  return (
    <div className="profile-image-input">
      <div className="input-label">프로필 이미지</div>
      <label className="image-preview" htmlFor="profile-image-input">
        {props.file && props.file[0] ? null : (
          <span className="click-here">
            여기를 눌러 프로필 이미지를 등록해주세요
            <br />
            <span>(png, jpeg, jpg)</span>
          </span>
        )}
      </label>
      <input
        type="file"
        id="profile-image-input"
        accept="image/png, image/jpeg, image/jpg"
        onChange={onChangeHandler}
        className="profile-image-input"
        required
        style={{ display: "none" }}
      />
    </div>
  );
}

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "TossFace";
  src: url("https://static.toss.im/assets/homepage/tossface/font/TossFaceFontMac.ttf") format("truetype");
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`;

export const SearchStyle = styled.div`
  margin-top: 20px;

  .search-container {
    max-width: 1130px;
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    margin: 0 auto;
    background-color: white;
  }

  .select {
    display: flex;
    align-items: space-between;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  .selection {
    border: 1px solid #f57977;
    border-radius: 8px;
    background-color: white;
    appearance: none;
    outline: none;
    width: 100%;
    font-size: 1.1rem;
    padding: 5px;
    margin: 0;
    margin-right: 8px;
    text-align-last: center;
    text-align: center;
    color: #f57977;
  }

  .selection.num {
    max-width: 100px;
    font-size: 0.8rem;
  }

  .button {
    background-color: #ffe3b2;
    margin: 0;
    margin-right: 8px;
    border: 2px solid #ffe3b2;
    border-radius: 8px;
    font-size: 14px;
    width: 25%;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    font-weight: 600;
    color: #f57977;
  }

  .button:last-child {
    margin-right: 0;
  }

  .button:hover {
    background-color: #f57977;
    border-color: #f57977;
    color: white;
  }

  .button:active {
    transform: scale(0.95);
  }
`;

export const AuthStyle = styled.div`
  min-width: 568px;
  width: 100vw;
  height: ${(props) => (props.signup ? "calc(100vh - 80px)" : "100vh")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    color: inherit;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    width: 100%;
    height: 100%;
    max-width: 568px;
    box-sizing: border-box;
  }

  .form-title {
    font-weight: 600;
    font-size: 1.2rem;
  }

  .form-logo {
    margin: 15px 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 1.2rem;
      color: #f57977;
      font-weight: 500;
      margin-left: 10px;
      color: #f57977;
      letter-spacing: -0.05rem;
    }
  }

  .form-container {
    display: flex;
    max-width: 65%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-inputs {
    input:not([type="file"]) {
      width: 100%;
      border: 2px solid #ebebeb;
      margin-bottom: 4px;
      font-size: 1rem;
      outline: none;
      background-color: transparent;
      padding: 10px 12px;
      border-radius: 8px;
      box-sizing: border-box;
    }
  }

  input.email {
    border: ${(props) =>
      props.validEmail == false ? "2px solid grey" : "2px solid #ebebeb"};
  }

  input.password {
    border: ${(props) =>
      props.validPassword == false ? "2px solid grey" : "2px solid #ebebeb"};
  }

  /* input.password-check {
      border: ${(props) =>
    props.validPassword == false
      ? "2px solid grey"
      : props.validPassword == true
      ? "2px solid #f57977"
      : "2px solid #ebebeb"};
    } */

  .profile-image-input {
    appearance: none;
  }

  .image-preview {
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 75%;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      width: 100%;
      padding-top: 100%;
    }
  }

  .click-here {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    word-break: keep-all;
    text-align: center;
    line-height: 1.2;
    color: grey;

    span {
      font-size: 0.8rem;
    }
  }

  .password-text {
    font-size: 0.8rem;
    margin-bottom: 12px;
    color: grey;
  }

  .confirm-text {
    margin-top: 6px;
    font-size: 0.8rem;
    color: #f57977;
    font-weight: 300;
  }

  .form-confirm {
    margin-bottom: 50px;

    input.password {
      margin-bottom: 24px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .input-label {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .auth-button {
    background-color: #f57977;
    padding: 11.5px 30px;
    font-size: 1rem;
    height: 100%;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    word-break: keep-all;
    box-sizing: border-box;
    margin-top: 20px;
    width: 100%;
  }

  .auth-button.confirm {
    background-color: white;
    border: 1px solid #f57977;
    color: #f57977;
    transition: background-color 150ms ease;
    margin-top: 5px;

    &:hover {
      background-color: rgba(245, 121, 119, 0.15);
    }
  }

  .auth-extra {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .extra-menu {
    font-size: 0.85rem;

    &:first-child {
      margin-right: 20px;
    }
  }

  .auth-sns {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  .auth-sns.signup {
    padding-bottom: 30px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 30px;
  }

  .auth-sns.login {
    border-top: 1px solid #e5e5e5;
    padding-top: 30px;
  }

  .auth-sns-text {
    font-size: 0.8rem;
    text-align: center;
    color: grey;
  }

  .auth-sns-selection {
    margin-top: 20px;
    display: flex;
  }

  .sns {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const NavStyle = styled.div`
  background-color: white;
  border-bottom: 1px solid #f5f5f5;

  a {
    text-decoration: none;
    color: inherit;
  }

  .nav-wrapper {
    height: 80px;
    max-width: 1130px;
    padding: 0 40px;
    margin: 0 auto;
    position: relative;
  }

  .nav-container {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .logo-img {
    height: 30px;
    padding: 15px 0px;
  }

  .logo-text {
    margin-left: 10px;
    font-weight: 500;
    color: #f57977;
    font-size: 1.2rem;
    letter-spacing: -0.05rem;
  }

  .nav-side {
    display: flex;
    align-items: center;
  }

  .nav-menu {
    padding: 10px 0px;
    margin-right: 25px;
    cursor: pointer;
    color: grey;
    transition: color 300ms ease-in-out;

    &:not(:last-child):hover {
      color: #f57977;
    }
  }

  .nav-menu:last-child {
    margin-right: 0;

    & > a {
      transition: color 300ms ease-in-out;

      :hover {
        color: #f57977;
      }
    }
  }

  .profile {
    width: 30px;
    height: 30px;
    border: 1px solid #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .nav-sub {
    position: absolute;
    top: 70px;
    right: 0;
    z-index: 1000;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #f5f5f5;
    visibility: hidden;
    transform-origin: 50% 0;
    opacity: 0;
    transform: none;
    transition: transform 200ms, opacity 200ms;
  }

  .nav-sub.open {
    visibility: visible;
    opacity: 1;
    transform: translateY(10px);
  }

  .nav-submenu {
    background-color: white;
    padding: 10px 30px 10px 15px;
    border-bottom: 1px solid #f5f5f5;
    color: black;
    font-size: 0.9rem;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f5f5f5;
    }
  }

  @media screen and (max-width: 768px) {
    .nav-menu:not(:last-child) {
      display: none;
    }
  }
`;

export const CarouselStyle = styled.div`
  max-width: 1130px;
  max-height: 522.625px;
  display: block;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  a {
    text-decoration: none;
    color: inherit;
  }

  .carousel-wrapper {
    display: flex;
    max-width: 1130px;
    height: 522.625px;
    position: relative;
    padding: 0 40px;
    margin: 0 -40px;
    box-sizing: border-box;
  }

  .carousel-list {
    width: 1130px;
    height: 522.625px;
    border-radius: 8px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    flex-shrink: 0;
    position: relative;
  }

  .img-desc {
    padding: 80px 60px;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .desc-title {
    font-size: 3rem;
    font-weight: 600;
    color: white;
    word-break: keep-all;
    width: 25%;
    line-height: 1.2;
    text-align: right;
  }

  .desc-button {
    margin-top: 40px;
    padding: 12px 20px;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
  }

  .slide-button {
    all: unset;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    border-radius: 50%;
    border: 1px solid grey;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    opacity: 0.7;
    transition: opacity 300ms ease;

    &:hover {
      opacity: 1;
    }
  }

  .prev {
    left: 8px;
  }

  .next {
    right: 8px;
  }
`;

export const ContentStyle = styled.div`
  max-width: 1130px;
  padding: 0 40px;
  margin: 0 auto;

  .content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 20px;
    column-gap: 10px;
  }

  .loading-text {
    text-align: center;
    color: #f57977;
    font-size: 2rem;
    font-weight: 500;
    padding-top: 40px;
  }

  @media screen and (max-width: 1210px) {
    .content-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    .loading-text {
      font-size: 1.5rem;
    }
  }
`;

export const ListStyle = styled.div`
  position: relative;
  height: 550px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  border-radius: 8px;

  &:hover {
    .pagination {
      visibility: visible;
    }
  }

  .list-box {
    height: 95%;
    max-height: 100%;
    padding: 20px;
    overflow: scroll;
  }

  .list {
    padding: 10px;
    border: 1px solid #f5f5f5;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: border-color 200ms;
    line-height: 1.2;
    position: relative;

    &:hover {
      border-color: black;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .hosptl-name {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.25rem;
    word-break: keep-all;

    &:last-child {
      font-size: 0.75rem;
      margin-bottom: 0;
    }
  }

  .hosptl-save {
    position: absolute;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .save {
    fill: #e5e5e5;
    transition: fill 200ms ease;

    &:hover {
      fill: #ffcb00;
    }
  }

  .pagination {
    visibility: hidden;
    z-index: 2;

    ol {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .prev,
    .next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -19px;
      padding: 12px;
      cursor: pointer;
      border: 1px solid #e5e5e5;
      background-color: white;
      border-radius: 50%;
      opacity: 0.5;
      transition: opacity 200ms ease, border-color 200ms ease;

      &:hover {
        opacity: 1;
        border-color: grey;
      }
    }

    .prev {
      right: unset;
      left: -19px;
    }
  }
`;

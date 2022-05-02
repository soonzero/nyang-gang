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

    &:last-child {
      margin-right: 0;
    }
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

    &.invalid {
      color: #f57977;
    }

    &.valid {
      text-decoration: line-through;
    }
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

    &:disabled {
      background-color: #f5f5f5;
      color: rgba(0, 0, 0, 0.15);
      border-color: rgba(0, 0, 0, 0.15);
      cursor: default;
    }

    &:not(:disabled):hover {
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
    justify-content: center;
    align-items: center;
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
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-bottom: 1px solid #f5f5f5;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 80px;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    z-index: 2;
    transition: opacity 200ms ease;
    /* border-bottom: 1px solid #f5f5f5; */
    opacity: ${(props) => (props.shadow == true ? 1 : 0)};
  }

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
    z-index: 3;
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
    color: #f57977;
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

  .nav-wrapper.sub-nav-wrapper {
    height: 100%;
  }

  .sub-nav-container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .sub-nav-menu {
    font-weight: 500;
    padding: 20px 10px;
    color: #a5a5a5;
    cursor: pointer;
    transition: color 200ms ease;

    &:hover {
      color: grey;
    }
  }

  .sub-nav-menu.open {
    color: black;
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
  z-index: 0;

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
  margin-top: 25px;

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
    padding-top: 285px;
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

  .name {
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }

  .check {
    margin-right: 5px;
    fill: #ffcb00;
    width: 1rem;
    height: 1rem;
  }

  .icon.check {
    width: 1rem;
    height: 1rem;
  }

  p {
    margin-bottom: 0.25rem;
    word-break: keep-all;

    &:last-child {
      font-size: 0.75rem;
      margin-bottom: 0;
    }
  }

  .star {
    position: absolute;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .icon.star {
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

export const AnimalsStyle = styled.div`
  display: block;
  width: 100%;

  a {
    text-decoration: none;
    color: inherit;
  }

  .list-container {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 20px;
  }

  .list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: border-color 200ms ease;

    &:hover {
      border-color: #e5e5e5;
    }
  }

  .img-container {
    display: grid;
    width: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;

    &::before {
      content: "";
      width: 100%;
      padding-top: 100%;
    }
  }

  .desc-container {
    margin-top: 6px;
  }

  p {
    font-size: 0.8rem;
    margin-top: 2px;
  }

  .top-button {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    padding: 20px;
    border-radius: 50%;
    background-color: black;
    bottom: 50px;
    right: 50px;
    cursor: pointer;
    transition: all 500ms ease;

    svg {
      transform: rotate(-90deg);
      width: 20px;
      height: 20px;
      color: white;
    }

    &:hover {
      transform: translateY(-10px);
    }
  }

  .top-button.display {
    visibility: visible;
    opacity: 1;
  }

  @media screen and (max-width: 1024px) {
    .list-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .list-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 375px) {
    .list-container {
      grid-template-columns: 1fr;
    }
  }
`;

export const MyAccountStyle = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 60px;

  .edit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 1.75rem;
      font-weight: 600;
    }

    span {
      font-size: 0.8rem;
      color: #b5b5b5;
      text-decoration: underline;
      cursor: pointer;
      line-height: 1;
    }
  }

  .edit-main {
    margin-top: 45px;
  }

  .edit-form {
    display: flex;
    padding: 20px 0;
    align-items: center;
  }

  .edit-form.password {
    div {
      display: flex;
      flex-direction: column;
    }

    .edit-input {
      margin-bottom: 15px;
    }
  }

  .edit-form.profile-img {
    align-items: flex-start;
    .edit-input {
      border: none;
    }
  }

  .edit-target {
    width: 10rem;
  }

  .edit-input,
  .edit-input-confirm {
    padding: 10px 12px;
    width: 15rem;
    outline: none;
    margin-right: 25px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    font-size: 1rem;
  }

  .edit-button {
    padding: 10px 20px;
    cursor: pointer;
    appearance: none;
    border: 1px solid #f57977;
    border-radius: 8px;
    background-color: white;
    color: #f57977;
    font-weight: 600;
    margin: 0;
    transition: background-color 200ms ease, color 200ms ease;

    &:hover {
      background-color: #f57977;
      color: white;
    }

    &:disabled {
      background-color: #f5f5f5;
      color: rgba(0, 0, 0, 0.15);
      border-color: rgba(0, 0, 0, 0.15);
      cursor: default;

      &:hover {
        cursor: not-allowed;
      }
    }
  }

  .edit-input-profile-img {
    appearance: none;
  }

  .image-preview {
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    position: relative;
    cursor: pointer;
    margin-right: 25px;
    padding: 10px;

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
`;

export const DeleteAccountStyle = styled.div`
  strong {
    font-weight: 500;
  }

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .desc,
  .header {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .content {
    margin-bottom: 20px;
    line-height: 1.5;
    word-break: keep-all;

    &:last-child {
      margin: 0;
    }
  }

  ol.content {
    list-style-type: disc;
    margin-left: 30px;
  }

  .main {
    border: 1px solid #b5b5b5;
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 20px;
  }

  .confirm-wrapper {
    .confirm-container {
      display: flex;
      align-items: center;
    }

    .check-box {
      display: inline-block;
      position: relative;
      padding: 9px;
    }

    input[type="checkbox"] {
      padding: 0;
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
    }

    span {
      span {
        margin-left: 5px;
        font-weight: 500;
        color: #f57977;
      }
    }
  }

  .check-container {
    display: inline-block;
    padding: 2px;
    border: 1px solid;
    border-color: ${(props) => (props.checked ? "transparent" : "#e5e5e5")};
    border-radius: 4px;
    line-height: 1;
    width: 22px;
    height: 22px;
    box-sizing: border-box;
    background-color: ${(props) => (props.checked ? "#f57977" : "white")};
  }

  .delete-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
      appearance: none;
      font-size: 1.2rem;
      font-weight: 500;
      border: none;
      border-radius: 8px;
      padding: 15px;
      max-width: 10rem;
      width: 100%;
      margin: 0;
      color: white;
      cursor: pointer;
    }

    button.delete {
      background-color: #b5b5b5;
      margin-right: 10px;
    }

    button.cancel {
      background-color: #f57977;
      margin-right: 0;
    }
  }
`;

export const PasswordStyle = styled.div`
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 40px;
  box-sizing: border-box;

  .header {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .inputs-container {
    margin: 30px 0 0;
    display: flex;
    flex-direction: column;

    input {
      padding: 10px;
      margin: 0;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      outline: none;
      font-size: 1rem;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .pw-title {
    font-weight: 500;
    margin-bottom: 10px;
  }

  .pw-desc {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .input-container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .error-msg {
    font-size: 0.8rem;
    position: absolute;
    bottom: 0;
    left: 20px;
  }

  .change-button {
    width: 100%;
    appearance: none;
    border: none;
    background-color: #f57977;
    opacity: 0.95;
    padding: 12px;
    color: white;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;

export const LicenseFullScreenStyle = styled.div`
  .container {
    width: 100vw;
    height: 100vh;
    position: relative;

    &:hover {
      .down {
        opacity: 1;
      }
    }
  }

  .clip {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    transition: all 500ms ease;
    opacity: 0.5;
  }

  .clip-left {
    clip-path: polygon(0% 0%, 58% 0%, 42% 100%, 0% 100%);
    background-image: url("https://pixabay.com/get/g254e03c7aaf4c1f02f969dfc8ed03d37672053d6bf732bcf63858b85a63c1e2d6c1a635defc0e8a0916287abfdf22b95995168b0b3d2cf9f5248e4f849728347d5f8742bc8d960034051c9ab6e0a6209_1920.jpg");
    z-index: 1;

    &:hover {
      clip-path: polygon(0% 0%, 88% 0, 72% 100%, 0% 100%);
      opacity: 1;
      z-index: 2;
    }
  }

  .clip-right {
    clip-path: polygon(58% 0%, 100% 0%, 100% 100%, 42% 100%);
    background-image: url("https://pixabay.com/get/g9b8ea29de0b2c7822a9568765befba047c3069e81957066c300ebbfa0e753e504068df573e530bccb69a94514a03aaf33248e364863c0ff601ddf54c5e0aab03dcef87f95e5cc3960fa5d854ff303fea_1920.jpg");
    z-index: 1;

    &:hover {
      clip-path: polygon(28% 0%, 100% 0%, 100% 100%, 12% 100%);
      opacity: 1;
      z-index: 2;
    }
  }

  .logo {
    position: absolute;
    top: 25px;
    left: 25px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 50%;
    z-index: 3;
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 500ms ease;

    svg {
      width: 50px;
      height: 50px;
      transition: all 500ms ease;
      color: white;
    }

    &:hover {
      background-color: white;
      opacity: 0.7;

      svg {
        color: #f57977;
      }
    }
  }

  .down {
    position: absolute;
    z-index: 3;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: black;
    border-radius: 50%;
    opacity: 0.2;
    transition: all 500ms ease;

    svg {
      width: 20px;
      height: 20px;
      color: white;
    }

    &:hover {
      transform: translate(-50%, -0.25rem) rotate(90deg);
    }
  }
`;

export const LicenseStyle = styled.div`
  width: 100%;
  height: 100vh;

  .content {
    padding: 25px 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .content-header {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .content-cards {
    display: grid;
    column-gap: 15px;
    padding: 1rem 0;
    margin-bottom: 20px;
  }

  .content-cards.license {
    grid-template-columns: repeat(4, 1fr);
  }

  .content-cards.way {
    grid-template-columns: 1fr 1fr;
  }

  .content-card {
    display: grid;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  .card-image {
    display: grid;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    grid-template-columns: minmax(0px, 1fr);
    grid-template-rows: minmax(0px, 1fr);

    &::before {
      content: "";
      width: 100%;
      padding-top: 67%;
      box-sizing: border-box;
      grid-area: 1 / 1 / 1 / 1;
    }
  }

  .card-text {
    padding: 1.5rem 1rem;
    background-color: #f5f5f5;

    h3 {
      font-size: 1.4rem;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
    }

    p {
      font-size: 1rem;
      line-height: 1.2;
      word-break: keep-all;
      margin-bottom: 10px;
    }
  }

  .extra-desc {
    display: flex;
    justify-content: center;
    word-break: keep-all;

    span {
      padding: 15px 30px;
      border-radius: 8px;
      background-color: #f5f5f5;
      color: black;
    }
  }

  @media screen and (max-width: 1210px) {
    .content-cards.license {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 40px;
      column-gap: 40px;
    }

    .card-image::before {
      padding-top: 50%;
    }
  }

  @media screen and (max-width: 768px) {
    .content-cards {
      grid-template-columns: 1fr;
    }
  }
`;

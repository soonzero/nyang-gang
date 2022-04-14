import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url(https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

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

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: white;

  &::after {
    content: "";
  }

  .searchPanel {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }

  .input {
    border: none;
    border-bottom: 2px solid #717171;
    outline: none;
    padding: 10px 15px 5px;
    font-size: 20px;
    text-align: center;
    box-sizing: border-box;
  }

  .input::placeholder {
    text-align: center;
  }

  .searchBtn {
    margin-left: 15px;
    font-size: 25px;
    padding: 4px 8px;
    background-color: transparent;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: background-color 150ms ease-in-out;
  }

  .searchBtn:hover {
    background-color: #f57977;
  }

  .searchBtn:active {
    transform: scale(0.95);
  }

  .select {
    display: flex;
    align-items: space-between;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  .selection {
    border: 2px solid #ffe3b2;
    border-radius: 8px;
    background-color: #ffe3b2;
    appearance: none;
    outline: none;
    width: 100%;
    font-size: 1.1rem;
    padding: 10px;
    margin: 0;
    margin-right: 8px;
    text-align-last: center;
    text-align: center;
    color: #f57977;
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

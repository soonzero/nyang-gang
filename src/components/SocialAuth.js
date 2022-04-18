import { ReactComponent as Apple } from "images/auth-apple.svg";
import { ReactComponent as Naver } from "images/auth-naver.svg";
import { ReactComponent as Kakao } from "images/auth-kakao.svg";
import { ReactComponent as Google } from "images/auth-google.svg";
import { ReactComponent as Facebook } from "images/auth-facebook.svg";
import { Link } from "react-router-dom";

export default function SocialAuth() {
  return (
    <div className="auth-sns-selection">
      <Link to="/" className="sns facebook">
        <div>
          <Facebook />
        </div>
      </Link>
      <Link to="/" className="sns kakao">
        <div>
          <Kakao />
        </div>
      </Link>
      <Link to="/" className="sns naver">
        <div>
          <Naver />
        </div>
      </Link>
      <Link to="/" className="sns apple">
        <div>
          <Apple />
        </div>
      </Link>
      <Link to="/" className="sns google">
        <div>
          <Google />
        </div>
      </Link>
    </div>
  );
}

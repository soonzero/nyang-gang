import Article from "./Article";
import { FeedStyle } from "./styled";

export default function Feed() {
  return (
    <FeedStyle>
      <Article />
      <Article />
      <Article />
    </FeedStyle>
  );
}

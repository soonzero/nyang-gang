import ProfilePanel from "components/ProfilePanel";
import Navbar from "components/Navbar";
import { AdoptionStyle, ContentStyle, PanelStyle } from "components/styled";
import Feed from "components/Feed";
import TodayPanel from "components/TodayPanel";

export default function Adoption() {
  return (
    <>
      <Navbar />
      <ContentStyle>
        <AdoptionStyle>
          <div className="part side">
            <PanelStyle>
              <ProfilePanel />
            </PanelStyle>
            <PanelStyle>
              <TodayPanel />
            </PanelStyle>
          </div>
          <div className="part main">
            <Feed />
          </div>
        </AdoptionStyle>
      </ContentStyle>
    </>
  );
}

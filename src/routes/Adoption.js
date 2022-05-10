import InfoPanel from "components/InfoPanel";
import Navbar from "components/Navbar";
import { AdoptionStyle, ContentStyle, PanelStyle } from "components/styled";
import TodayPanel from "components/TodayPanel";

export default function Adoption() {
  return (
    <>
      <Navbar />
      <ContentStyle>
        <AdoptionStyle>
          <div className="part side">
            <PanelStyle>
              <InfoPanel />
            </PanelStyle>
            <PanelStyle>
              <TodayPanel />
            </PanelStyle>
          </div>
          <div className="part main">main</div>
        </AdoptionStyle>
      </ContentStyle>
    </>
  );
}

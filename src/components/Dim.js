import { DimStyle } from "./styled";

export default function Dim(props) {
  return (
    <DimStyle onClick={() => props.setModal(false)}>
      <div className="dim"></div>
    </DimStyle>
  );
}

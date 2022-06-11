// import { HeaderContainer } from "../containers/header";
import "../components/editing/editingstyle.css";
import "../components/editing/editingmain.js";

export default function Main() {
  return (
    <>
      {/* <HeaderContainer /> */}
      <div id="blackmask"></div>
      <div id="mode-viewer">
        <p>E</p>
      </div>
      <div id="measures" style={{ display: "none" }}>
        30
      </div>

      <div id="editer-container">
        <div id="blackmask"></div>
        <div id="piano">
          <img src="../images/main-page/pianokey.jpg" alt="piano" />
        </div>
      </div>
    </>
  );
}

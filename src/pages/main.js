import { Header } from "../components";
import { useContext } from "react";
import * as ROUTES from "../constants/routes";
import logo_white from "../logo_white.svg";
import { FirebaseContext } from "../context/firebase";
import "../components/editing/editingstyle.css";
import "../components/editing/editingmain.js";

export default function Main() {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  return (
    <>
      <Header dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo_white} alt="Netflix" />
          </Header.Group>
          <Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
      </Header>

      <div id="blackmask"></div>

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

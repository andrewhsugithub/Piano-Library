import { Header } from "../components";
import { useContext } from "react";
import * as ROUTES from "../constants/routes";
import logo_white from "../logo_white.svg";
import { FirebaseContext } from "../context/firebase";
import "../components/editing/editingstyle.css";
import "../components/editing/editingmain.js";
import MidiData from "../components/editing/example_midiJSON";

export default function Main() {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  return (
    <>
      {" "}
      {/* <Header dontShowOnSmallViewPort>
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
                  </Header> */}{" "}
      <p id="MIDIDATE" style={{ display: "none " }}>
        {" "}
        {JSON.stringify({ MidiData })}{" "}
      </p>
      <div
        id="menu_bar"
        onload={() => {
          window.onload = function () {
            if (!localStorage.loaded) {
              localStorage.setItem("loaded", "yes");
              window.location.reload();
            }
          };
        }}
      >
        <div id="logo">
          <a href={ROUTES.HOME}>
            <img src={logo_white} alt="Netflix" />
          </a>{" "}
        </div>{" "}
        <div id="mode-viewer"> </div> <div id="save_button"> </div>{" "}
        <div id="user">
          <Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />{" "}
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />{" "}
                  <Header.TextLink> {user.displayName} </Header.TextLink>{" "}
                </Header.Group>{" "}
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out{" "}
                  </Header.TextLink>{" "}
                </Header.Group>{" "}
              </Header.Dropdown>{" "}
            </Header.Profile>{" "}
          </Header.Group>{" "}
        </div>{" "}
      </div>{" "}
      <div id="blackmask"> </div>
      <div id="editer-container">
        <div id="piano">
          <img src="../images/main-page/pianokey.jpg" alt="piano" />
        </div>{" "}
        <div id="sounds-container"> </div> <div id="grid-container"> </div>{" "}
      </div>{" "}
    </>
  );
}

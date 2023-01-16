import { Header } from "../components";
import { useContext, useState } from "react";
import * as ROUTES from "../constants/routes";
import logo_white from "../logo_white.svg";
import { FirebaseContext } from "../context/firebase";
import "../components/editing/editingstyle.css";
import "../components/editing/editingmain.js";
import MidiData from "../components/editing/example_midiJSON";
import axios from "axios";

export default function Main() {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  const [Midi, setMidi] = useState(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Midi);
    try {
      const response = await axios.get("localhost:3000" + ROUTES.MAIN, {
        Midi: Midi,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                  </Header> */}
      <p id="MIDIDATE" style={{ display: "none " }}>
        {JSON.stringify({ MidiData })}
      </p>
      <div id="menu_bar">
        <div id="logo">
          <a href={ROUTES.HOME}>
            <img src={logo_white} alt="Netflix" />
          </a>
        </div>
        <div id="mode-viewer"> </div>
        <div id="save_button">
          <form
            style={{ width: "100%", height: "100%" }}
            onSubmit={() => {
              console.log("submittttt");
              handleSubmit();
            }}
          >
            <input
              type="text"
              id="midi_input"
              name="Midi"
              value={JSON.stringify({ MidiData })}
              style={{ display: "none" }}
              onChange={(e) => setMidi(e.target.value)}
            ></input>
            <input
              type="submit"
              id="midi_submit"
              value=""
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                border: "none",
              }}
            ></input>
          </form>
        </div>
        <div id="user">
          <Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink> {user.displayName} </Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </div>
      </div>
      <div id="blackmask"> </div>
      <div id="editer-container">
        <div id="piano">
          <img src="../images/main-page/pianokey.jpg" alt="piano" />
        </div>
        <div id="sounds-container"> </div> <div id="grid-container"> </div>
      </div>
    </>
  );
}

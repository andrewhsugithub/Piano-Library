import React, { useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Button,
  Overlay,
  Inner,
  Close,
  Transcribe,
} from "./styles/player";
import { Link as ReachRouterLink } from "react-router-dom";
import MIDISounds from "midi-sounds-react";

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
}

Player.Audio = function PlayerAudio({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={() => setShowPlayer(false)} data-testid="player">
          <Inner></Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ to, src, ...restProps }) {
  // const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return (
    <ReachRouterLink
      to={to}
      onClick={function () {
        console.log(to);
        // setShowPlayer((showPlayer) => !showPlayer);
        window.open(
          this.to,
          "newWindow",
          "toolbar=no,location=no,status=no,menubar=no,width= 293px height= 53.313px"
        );
      }}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      {/* <>
        <MIDISounds
          ref={(ref) => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[0]}
        /> */}
      <Button {...restProps}>Play</Button>
      {/* //{" "}
      </> */}
    </ReachRouterLink>
  );
};

Player.Transcribe = function PlayerTranscribe({ to, ...restProps }) {
  return (
    <ReachRouterLink to={to} style={{ textDecoration: "none" }}>
      <Transcribe {...restProps}>Transcribe</Transcribe>
    </ReachRouterLink>
  );
};

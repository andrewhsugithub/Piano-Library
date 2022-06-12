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

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container {...restProps}>{children}</Container>
    </PlayerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={() => setShowPlayer(false)} data-testid="player">
          <Inner>
            <video id="netflix-player" controls>
              <source src={src} type="video/mp4" />
            </video>
            <Close />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return (
    <Button
      onClick={() => setShowPlayer((showPlayer) => !showPlayer)}
      {...restProps}
    >
      Play
    </Button>
  );
};

Player.Transcribe = function PlayerTranscribe({ to, ...restProps }) {
  return (
    <ReachRouterLink to={to} style={{ textDecoration: "none" }}>
      <Transcribe {...restProps}>Transcribe</Transcribe>
    </ReachRouterLink>
  );
};

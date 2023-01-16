import { Feature, OptForm } from "../components";
import { FooterContainer } from "../containers/footer";
import { JumbotronContainer } from "../containers/jumbotron";
import { ContactContainer } from "../containers/contact";
import { CommentContainer } from "../containers/comment";
import { HeaderContainer } from "../containers/header";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "white",
        max_width: "1500px",
        min_width: "200px",
      }}
    >
      <HeaderContainer>
        <Feature>
          <Feature.Title>
            Upload your piano piece as MIDI transcription right away!
          </Feature.Title>
          <Feature.SubTitle>
            Convert anywhere. Cancel at any time.
          </Feature.SubTitle>

          <OptForm>
            <OptForm.Input placeholder="Email Address" />
            <OptForm.Button>Try it now</OptForm.Button>
            <OptForm.Break />
            <OptForm.Text>
              Are you ready? Enter your email to create or restart your
              membership
            </OptForm.Text>
          </OptForm>
        </Feature>
      </HeaderContainer>
      <JumbotronContainer />
      <CommentContainer />
      <ContactContainer />
      <FooterContainer />
    </div>
  );
}

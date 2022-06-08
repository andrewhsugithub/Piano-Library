import contactData from "../fixtures/contact";
import { Contact } from "../components";

export function ContactContainer() {
  return (
    <Contact.Container>
      <Contact.MainTitle>
        Contact Us!
      </Contact.MainTitle>
      {contactData.map((item) => (
        <Contact key={item.id} direction={item.direction}>
          <Contact.Pane>
            <Contact.Icon src="/images/landing-page/email-icon.png" alt="email"/>
            <Contact.Email href={"mailto:" + item.email}>{item.email}</Contact.Email>
            <Contact.Icon src="/images/landing-page/github-icon.png" alt="github"/>
            <Contact.Link href={item.github_link}>{item.name}</Contact.Link>
          </Contact.Pane>

          <Contact.Pane>
            <Contact.Image src="/images/landing-page/face_male.png" alt="face" />
            <Contact.Name>{item.name}</Contact.Name>
          </Contact.Pane>
        </Contact>
      ))}
    </Contact.Container>
  );
}

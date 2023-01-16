import contactData from "../fixtures/contact";
import { Contact } from "../components";

export function ContactContainer() {
  return (
    <div>
      <Contact.MainTitle>
        Meet The Team
      </Contact.MainTitle>
      <Contact.SubTitle>
        We are a small group of inverntors, hackers and designers from the differrent parts of the world on a mission.
      </Contact.SubTitle>
      <Contact.Container>
        {contactData.map((item) => (
          <Contact key={item.id} direction={item.direction}>
            <Contact.Pane>
              <Contact.Image src="/images/landing-page/face.png" alt="face" />
              <Contact.Name>{item.name}</Contact.Name>
            </Contact.Pane>

            <Contact.Pane>
              <Contact.IdPackage>
                <Contact.IconLink href={"mailto:" + item.email}>
                  <Contact.Icon src="/images/landing-page/email-icon.png" alt="email"/>
                </Contact.IconLink>
                <Contact.Email href={"mailto:" + item.email}>{item.email}</Contact.Email>
              </Contact.IdPackage>

              <Contact.IdPackage>
                <Contact.IconLink href={item.github_link}>
                  <Contact.Icon src="/images/landing-page/github-icon.png" alt="github"/>
                </Contact.IconLink>
                <Contact.Link href={item.github_link}>{item.name}</Contact.Link>
              </Contact.IdPackage>
            </Contact.Pane>
          </Contact>
        ))}
      </Contact.Container>
    </div>
  );
}

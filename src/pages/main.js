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

      <a href=""><div id="logo"><img src="" alt="Logo" height="100%"></div></a>
      <a href=""><div id="user"><img src="" alt="user" height="100%"></div></a>

      <div id="editer-container">
        <div id="blackmask"></div>
        <div id="piano">
          <img src="../images/main-page/pianokey.jpg" alt="piano" />
        </div>
      </div>
      <script>
        let logo = document.getElementById("logo");
        logo.style.position = "fixed";
        logo.style.width = "10%";
        logo.style.height = Math.ceil(window.innerHeight*(0.07)).toString()+"px";
        logo.style.top = Math.ceil(window.innerHeight*(0.015)).toString()+"px";
        logo.style.left = "3%";
        logo.style.backgroundColor = "transparent";
        logo.style.border = "0px";
        logo.style.display = "flex";
        logo.style.justifyContent = "center";
        logo.style.alignItems = "center";
        logo.style.border = "1px solid black";
        logo.style.zIndex = "15";
        logo.style.transition = " top 0.3s"

        let user = document.getElementById("user");
        user.style.position = "fixed";
        user.style.width = "5%";
        user.style.height = Math.ceil(window.innerHeight*(0.07)).toString()+"px";
        user.style.top = Math.ceil(window.innerHeight*(0.015)).toString()+"px";
        user.style.right = "3%";
        user.style.backgroundColor = "transparent";
        user.style.border = "0px";
        user.style.display = "flex";
        user.style.justifyContent = "center";
        user.style.alignItems = "center";
        user.style.border = "1px solid black";
        user.style.zIndex = "15";
        user.style.transition = " top 0.3s"

        var prevScrollpos1 = window.pageYOffset;
        window.addEventListener("scroll", (e) => {
        const currentScrollPos1 = window.pageYOffset;
        if (prevScrollpos1 > currentScrollPos1) {
            document.getElementById("logo").style.top = Math.ceil(window.innerHeight*(0.015)).toString()+"px";
            document.getElementById("user").style.top = Math.ceil(window.innerHeight*(0.015)).toString()+"px";
        } else {
            document.getElementById("logo").style.top = "-"+ (Math.ceil(window.innerHeight*(0.015))+Math.ceil(window.innerHeight*(0.07))).toString()+"px";
            document.getElementById("user").style.top = "-"+ (Math.ceil(window.innerHeight*(0.015))+Math.ceil(window.innerHeight*(0.07))).toString()+"px";
        }
        prevScrollpos1 = currentScrollPos1;

        })

        window.addEventListener("resize", (e) => {
            logo.style.height = Math.ceil(window.innerHeight*(0.07)).toString()+"px";
            user.style.height = Math.ceil(window.innerHeight*(0.07)).toString()+"px";
        })

    </script>
    </>
  );
}

import { styled, keyframes } from "styled-components";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import StartNow from "./StartNow";
import { UserContext } from "../../UserContext";

const HomePage = () => {
  const { user } = useAuth0();
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    document.title = "Bit";

    return () => {
      document.title = "Bit";
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetch("/addUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((parsed) => {
          console.log(parsed);
          window.localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <Main>
      <Body>
        <Header />
        <HeroSection>
          <ImageOne src={"images/sticky-imageone.png"} alt="Sticky notes" />
          <TextBox>
            <div>
              &nbsp;"Being organized is being in control, and being in control
              gives you confidence."
            </div>
            &nbsp;
            <div>
              &nbsp; Our tools provide simple yet effective solutions such as a
              checklist with dates and workflow boards, enabling you to
              visualize work items and track their statuses. By utilizing these
              tools, you can easily identify areas that require your attention
              and ensure smoother project management.
            </div>
            <StartNow />
          </TextBox>

          <ImageTwo src={"images/kanban-homepage.png"} alt="Kanban board" />
        </HeroSection>
        <GradientBox></GradientBox>
      </Body>
    </Main>
  );
};

export default HomePage;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;
const Body = styled.div`
  width: 100%;
  height: 100%;
`;

const gradientAnimation = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;
const GradientBox = styled.div`
  background-image: linear-gradient(40deg, #00c4cc, #ff66c4, #ffa53b);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s linear infinite;
  transform: skew(1 rad);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  @media only screen and (max-width: 1024px) {
    height: 130%;
  }
  @media only screen and (max-width: 700px) {
    height: 120%;
  }
  @media only screen and (max-width: 350px) {
    height: 110%;
  }
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  height: 70vh;

  @media only screen and (max-width: 1024px) {
    justify-content: center;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 5%;
  }
`;

const imageOneFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const imageTwoFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
  
`;

const ImageOne = styled.img`
  z-index: 1;
  width: 35%;
  align-self: flex-start;
  animation: ${imageOneFadeIn} 1s ease-in-out;

  @media only screen and (max-width: 1024px) {
    width: 30%;
  }
  @media only screen and (max-width: 768px) {
    align-self: center;
    width: 40%;
  }
  @media only screen and (max-width: 425px) {
    align-self: center;
    width: 70%;
  }
`;

const ImageTwo = styled.img`
  z-index: 1;
  width: 30%;
  align-self: flex-end;
  animation: ${imageTwoFadeIn} 1s ease-in-out;
  @media only screen and (max-width: 1024px) {
    width: 30%;
  }
  @media only screen and (max-width: 768px) {
    align-self: center;
    width: 40%;
  }
  @media only screen and (max-width: 425px) {
    align-self: center;
    width: 70%;
  }
`;
const TextBox = styled.div`
  align-self: flex-end;
  color: black;
  font-size: 1.5rem;
  opacity: 0.5;
  width: 30%;
  padding: 5%;

  @media (max-width: 1500px) {
    align-self: center;
  }
  @media only screen and (max-width: 1024px) {
    font-size: 1.25rem;
    align-self: center;
  }
  @media only screen and (max-width: 768px) {
    align-self: center;
    width: 80%;
  }

  @media only screen and (max-width: 425px) {
    font-size: 1rem;
  }
`;

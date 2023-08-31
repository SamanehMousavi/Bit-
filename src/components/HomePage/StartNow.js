import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const StartNow = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <StartButton onClick={() => loginWithRedirect()}>Start Now</StartButton>
    )
  );
};
export default StartNow;

const StartButton = styled.button`
  display: block;
  opacity: 1;
  color: blue;
  padding: 2rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  &:hover {
    color: purple;
  }
  &:active {
    scale: 0.9;
  }
  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 0.5rem;
  }
  @media only screen and (max-width: 425px) {
    font-size: 1rem;
    margin-right: 0;
  }
`;

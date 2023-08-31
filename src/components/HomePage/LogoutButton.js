import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Logoutbutton
        onClick={() => {
          window.localStorage.clear();
          logout();
        }}
      >
        Sign Out
      </Logoutbutton>
    )
  );
};
export default LogoutButton;

const Logoutbutton = styled.button`
  margin-right: 2rem;
  opacity: 1;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  &:hover {
    color: yellow;
  }
  &:active {
    scale: 0.9;
  }
  @media (max-width: 1500px) {
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 0;
  }
  @media only screen and (max-width: 425px) {
    font-size: 1rem;
    margin-right: 0;
  }
`;

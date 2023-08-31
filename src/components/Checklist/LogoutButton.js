import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated, user } = useAuth0();

  return (
    isAuthenticated && (
      <LogOutContainer>
        <UserName> {user.name}</UserName>
        <Signoutbutton
          onClick={() => {
            window.localStorage.clear();
            logout();
          }}
        >
          Sign Out
        </Signoutbutton>{" "}
      </LogOutContainer>
    )
  );
};
export default LogoutButton;
const LogOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
  align-items: center;
  margin: 5%;
`;

const Signoutbutton = styled.button`
  opacity: 1;
  color: #00c4cc;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  &:hover {
    color: #cb6ce6;
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

const UserName = styled.div`
  opacity: 1;
  color: #00c4cc;
  background-color: transparent;
  border: none;
  font-size: 2rem;
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

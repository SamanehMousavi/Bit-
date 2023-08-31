import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "react-icons-kit";
import { navicon } from "react-icons-kit/fa/navicon";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleDropdownClick = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <HeaderMain>
        <Logo>Bit</Logo>
        {user && (
          <TaskProject>
            <Tasks
              onClick={() => {
                navigate("/checklist");
              }}
            >
              Manage Your Tasks
            </Tasks>
            <Projects
              onClick={() => {
                navigate("/projects");
              }}
            >
              Manage Your Projects
            </Projects>
          </TaskProject>
        )}
        <LoginButton />
        <LogoutButton />
      </HeaderMain>

      {/* ////////////////////////////////// */}

      <DropDown>
        <Logo>Bit</Logo>
        <Main onClick={handleOpen}>
          <Icon icon={navicon} size={30} />
        </Main>
        {open && (
          <DropDownContainer>
            {user && (
              <TaskProject>
                <Tasks onClick={() => handleDropdownClick("/checklist")}>
                  Manage Your Tasks
                </Tasks>
                <Projects onClick={() => handleDropdownClick("/projects")}>
                  Manage Your Projects
                </Projects>
              </TaskProject>
            )}
            <LoginButton />
            <LogoutButton />
          </DropDownContainer>
        )}
      </DropDown>
    </>
  );
};

export default Header;

const HeaderMain = styled.div`
  display: grid;
  grid-template-columns: 15% 60% 15%;
  align-items: center;
  justify-items: end;
  height: 15%;
  opacity: 1;
  width: 100%;
  margin-bottom: 5%;
  @media (max-width: 1500px) {
    grid-template-columns: 15% 60% 15%;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 20% 60% 20%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const DropDown = styled.div`
  display: none;
  margin-bottom: 10%;
  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20%;
  }
`;
const Main = styled.div`
  cursor: pointer;
`;
const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Logo = styled.div`
  color: white;
  opacity: 1;
  font-size: 8rem;
  margin-top: 1%;
  @media (max-width: 1500px) {
    font-size: 6rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 5rem;
  }
`;

const TaskProject = styled.div`
  display: flex;
  gap: 10%;
  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Projects = styled.button`
  color: white;
  opacity: 1;
  border: none;
  font-size: 2rem;
  background-color: transparent;
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
  }
  @media only screen and (max-width: 425px) {
    font-size: 1rem;
  }
`;
const Tasks = styled.button`
  color: white;
  opacity: 1;
  border: none;
  font-size: 2rem;
  background-color: transparent;

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
  }

  @media only screen and (max-width: 425px) {
    font-size: 1rem;
  }
`;

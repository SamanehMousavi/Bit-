import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const Projects = ({ boardId, projectId }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState({});
  const Refresh = () => {
    fetch(`/getprojects/${currentUser.email}`)
      .then((response) => response.json())
      .then((parsed) => {
        if (parsed.status === 404) {
          throw new Error(parsed.message);
        }

        setProjects(parsed.data);
      })
      .catch((error) => {
        setProjects([]);
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      Refresh();
    }
  }, [currentUser]);

  const handleDelete = (index) => {
    fetch(`/deleteProject/${currentUser.email}/${index}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed);
        Refresh();
      })

      .catch((error) => console.log(error));
  };

  return (
    <Main>
      <Header />
      <Body>
        <ProjectsOverview>
          <Text>Projects Overview</Text>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <HeaderRow>
                  <TableHeader align="center">Project Title</TableHeader>
                  <TableHeader align="center">Due Date</TableHeader>
                  <TableHeader align="center">Project Description</TableHeader>
                  <TableHeader align="center">
                    Day's Left to Complete
                  </TableHeader>
                  <TableHeader align="center">Status</TableHeader>
                  <TableHeader align="center"></TableHeader>
                </HeaderRow>
              </TableHead>
              <TableBody>
                {Object.values(projects).map((project, index) => {
                  if (!project) {
                    return null;
                  }

                  const Difference_In_Time =
                    new Date(project.dueDate).getTime() - new Date().getTime();
                  const Difference_In_Days = Math.floor(
                    Difference_In_Time / (1000 * 3600 * 24)
                  );

                  return (
                    <TableRow key={index}>
                      <ProjectRow align="center">
                        <a
                          onClick={() => {
                            navigate(`/projectdetails/${project._id}`);
                          }}
                          style={{ textDecoration: "underline" }}
                        >
                          {project.title}
                        </a>
                      </ProjectRow>
                      <ProjectRow align="center">{project.dueDate}</ProjectRow>
                      <ProjectRow align="center">
                        {project.description}
                      </ProjectRow>
                      <ProjectRow align="center">
                        {Difference_In_Days}
                      </ProjectRow>
                      <ProjectRow align="center">{project.status}</ProjectRow>
                      <ProjectRow align="center">
                        <Delete
                          onClick={() => {
                            handleDelete(project._id);
                          }}
                        >
                          Delete
                        </Delete>
                      </ProjectRow>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <CreateProject
            onClick={() => {
              navigate(`/createboard`);
            }}
          >
            Add New Project
          </CreateProject>
        </ProjectsOverview>

        <GradientBox></GradientBox>
      </Body>
    </Main>
  );
};

export default Projects;
const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  position: relative;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  width: 100%;
  height: 85%;
  bottom: 0;
  background-image: linear-gradient(-30deg, orange, #ffde59, #c1ff72);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  transform: skewY(-10deg);
  z-index: -2;
`;

const CreateProject = styled.button`
  font-size: 1.5rem;
  border-radius: 0.5rem;
  background-color: #00c4cc;
  border: none;
  padding: 2%;

  &:hover {
    background-color: yellow;
    color: black;
  }

  &:active {
    background-color: yellow;
    scale: 0.9;
  }
  margin: 2%;
`;
const overviewFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);

    
  }
`;

const ProjectsOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2%;
  color: black;
  font-size: 2rem;
  animation: ${overviewFadeIn} 1s ease-in-out;
`;
const Text = styled.div`
  margin: 5%;
`;
const TableHeader = styled(TableCell)`
  && {
    font-size: 1.5rem;
    color: black;
    border: 0.25rem solid #a6a6a6;
    background-color: #00c4cc;
    width: 15%;
  }
`;
const HeaderRow = styled(TableRow)`
  && {
    width: 100%;
  }
`;
const ProjectRow = styled(TableCell)`
  && {
    font-size: 1.5rem;
    color: black;
    background-color: #ffeda6;
    // background-color: none;
    // z-index: -2;
    border: 0.25rem solid #a6a6a6;
  }
`;
const Delete = styled.button`
  font-size: 1.5rem;
  color: black;
  border-radius: 0.5rem;
  background-color: #00c4cc;
  border: none;
  padding: 10%;

  &:hover {
    background-color: yellow;
    color: black;
  }

  &:active {
    background-color: yellow;
    scale: 0.9;
  }
`;

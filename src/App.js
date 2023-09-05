import { Routes, BrowserRouter, Route } from "react-router-dom";
import { styled } from "styled-components";
import HomePage from "./components/HomePage/HomePage";
import CheckList from "./components/Checklist/CheckList";
import Projects from "./components/ProjectManagerTool/Projects";
import CreateBoard from "./components/ProjectManagerTool/CreateBoard";
import ProjectDetails from "./components/ProjectManagerTool/ProjectDetails";
import GlobalStyle from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checklist" element={<CheckList />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/createboard" element={<CreateBoard />} />
            <Route
              path="/projectdetails/:projectId"
              element={<ProjectDetails />}
            />
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    </>
  );
}

export default App;
const Main = styled.div``;
const Footer = styled.div``;

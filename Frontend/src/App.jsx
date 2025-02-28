import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./helpers/theme";
import { GlobalStyles } from "./GlobalStyles";
//rrd
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home";
import LoginPage from "./Pages/Authentication/Login";
import SignUpPage from "./Pages/Authentication/SignUp";
import NotFound from "./Pages/NotFound";
import Hire from "./Pages/Hire";
import Welcome from "./Pages/onboarding/welcome";
import Role from "./Pages/onboarding/Role";
import Language from "./Pages/onboarding/LanguageSelection";
import Bio from "./Pages/onboarding/Bio";
import HourlyRate from "./Pages/onboarding/HourlyRate";
import Chatpage from "./Pages/Chatpage";
import ResumeUploader from "./Pages/onboarding/ResumeUploader";
import SkillSelector from "./Pages/onboarding/SkillSelector";
import WorkExperience from "./Pages/onboarding/WorkExperience";
import Education from "./Pages/onboarding/Education";
import Categories from "./Pages/onboarding/Categories";
import ProjectDetailPage from "./Pages/ProjectDetail";
import FindProjects from "./Pages/FindProjects";
import MainProfile from "./Pages/MainProfile";
import Profile from "./Pages/Profile";
import AIFeature from "./Pages/AIFeature";
import Roomname from "./Pages/Roomname";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadinPage from "./components/LoadingPage";
import MyOffers from "./Pages/MyOffers";
import Offers from "./Pages/Offers";
import MyProjectDetail from "./Pages/MyProjectDetail";
import { ProposalAnalysis } from "./Pages/ProposalAnalysis";
import Meetingpage from "./Pages/Meetingpage";
import MyProjects from "./Pages/MyProjects";
import CreateProject from "./Pages/CreateProject";
import CreateProposal from "./Pages/CreateProposal";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Main>
          <GlobalStyles />
          <Navbar />
          <Routes>
            {/* Authentication pages */}
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />

            {/* home page */}
            <Route exact path="/" element={<Home />} />

            {/* Other pages */}
            <Route exact path="/hire" element={<Hire />} />

            {/* profile page */}
            <Route path="/edit-profile" element={<Profile />} />
            <Route path="/profile" element={<MainProfile />} />

            {/* chat page */}
            <Route path="/chats" element={<Chatpage />} />

            {/* Project Routes */}
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/projects" element={<FindProjects />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route
              path="/project/:id/create-proposal"
              element={<CreateProposal />}
            />
            <Route path="/project/:id" element={<ProjectDetailPage />} />

            {/* AI Analysis Page */}
            <Route
              path="/project/:projectId/proposal/:proposalId/analyze"
              element={<ProposalAnalysis />}
            />

            {/* Offers Routes */}
            <Route path="/myoffers" element={<MyOffers />} />
            <Route path="/jobs" element={<Offers />} />

            {/* <Route path="/Roomenter" element={<Roomname />} />
            <Route path="/Meeting/:roomId" element={<Meetingpage />} /> */}

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;

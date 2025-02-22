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
import DashBoard from "./Pages/DashBoard";
import OnBoarding from "./Pages/OnBoarding";
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

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadinPage from "./components/LoadingPage";
import MyOffers from "./Pages/MyOffers";
import Offers from "./Pages/Offers";
import MyProjectDetail from "./Pages/MyProjectDetail";

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
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path="/loading" element={<LoadinPage />} />

            {/* onboarding pages */}

            {/*1 */}
            <Route exact path="/create-profile" element={<Welcome />} />
            {/* 2 */}
            <Route
              exact
              path="/create-profile/resume-upload"
              element={<ResumeUploader />}
            />
            {/* 3 */}
            <Route
              exact
              path="/create-profile/categories"
              element={<Categories />}
            />
            {/* 4 */}
            <Route
              exact
              path="/create-profile/skills"
              element={<SkillSelector />}
            />
            {/* 5 */}
            <Route
              exact
              path="/create-profile/language"
              element={<Language />}
            />
            {/* 6 */}
            <Route exact path="/create-profile/role" element={<Role />} />
            {/* 7 */}
            <Route
              exact
              path="/create-profile/work-experience"
              element={<WorkExperience />}
            />
            {/* 8 */}
            <Route
              exact
              path="/create-profile/education"
              element={<Education />}
            />
            {/* 9 */}
            <Route exact path="/create-profile/bio" element={<Bio />} />
            {/* 10 */}
            <Route
              exact
              path="/create-profile/hourly-rate"
              element={<HourlyRate />}
            />

            {/* profile page */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/main-profile" element={<MainProfile />} />

            {/* chat page */}
            <Route path="/chats" element={<Chatpage />} />
              
            <Route path="/my-projects" element={<FindProjects/>}/>
            <Route path="/project/:id" element={<ProjectDetailPage/>}/>
            <Route path="/myproject/:id" element={<MyProjectDetail/>}/>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
            <Route path="/myoffers" element={<MyOffers/>}/>
            <Route path="/offers" element={<Offers/>}/>

            
          </Routes>
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;

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
import WorkSelection from "./Pages/onboarding/WorkSelection";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
            <Route path="/DashBoard" element={<DashBoard />} />

            {/* Other pages */}
            <Route exact path="/hire" element={<Hire />} />

            {/* onboarding pages */}
            <Route exact path="/create-profile" element={<Welcome />} />
            <Route exact path="/create-profile/work" element={<WorkSelection />} />
            <Route exact path="/create-profile/role" element={<Role />} />
            <Route exact path="/create-profile/language" element={<Language />} />
            <Route exact path="/create-profile/bio" element={<Bio />} />
            <Route exact path="/create-profile/hourly-rate" element={<HourlyRate />} />

            {/* chat page */}
            <Route path="/chats" element={<Chatpage/>} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;

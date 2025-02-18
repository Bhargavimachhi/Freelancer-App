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
import DashBoard from "./Pages/DashBoard";
import OnBoarding from "./Pages/OnBoarding";
import Chatpage from "./Pages/Chatpage";

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
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route exact path="/hire" element={<Hire />} />
            <Route path="/chats" element={<Chatpage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;

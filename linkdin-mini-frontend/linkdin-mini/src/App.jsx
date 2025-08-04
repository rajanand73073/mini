import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import StartPage from "./Start/Start.jsx";
import SignIn from "./Auth/SignIn.jsx";
import SignUp from "./Auth/SignUp.jsx";
import HomeFeed from "./Dashboard/HomeFeed.jsx";
import Profile from "./Profile/profile.jsx";
import UserProtectWrapper from "./wrapper/Protectionwrapper.jsx";
import AuthorProfile from "./Profile/AuthorProfile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <HomeFeed />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectWrapper>
              <Profile />
            </UserProtectWrapper>
          }
        />
        <Route path="/profile/:userId" element={<AuthorProfile />} />
      </Routes>
    </>
  );
}

export default App;

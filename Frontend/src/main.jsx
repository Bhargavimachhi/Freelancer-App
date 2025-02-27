  import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Context/UserContext"; // Updated import

const PUBLISHABLE_KEY =
  "pk_test_a2V5LWJvbmVmaXNoLTM2LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Toaster position="top-center" />
      <UserProvider>
        <App />
      </UserProvider>
    </ClerkProvider>
  </StrictMode>
);

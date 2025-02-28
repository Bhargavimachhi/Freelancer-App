import  { createContext, useContext, useState, useEffect } from "react";

// Define the initial state and context
const AuthContext = createContext([null, () => {}]); // Default value to prevent undefined issues

// AuthProvider component
const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(() => {
    // Load initial state from localStorage if available
    const savedAuth = JSON.parse(localStorage.getItem("score"));
    return savedAuth || { skillMatch : 40, experienceLevel : 30, answeringCapabilities : 25, pricing : 5};
  });

  useEffect(() => {
    // Persist auth state to localStorage whenever it changes
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  return (
    <AuthContext.Provider value={[score, setScore]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
const useScore = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useScore, ScoreProvider };


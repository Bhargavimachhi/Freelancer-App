import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { reducer } from "@/Reducer/UserReducer";

const UserContext = createContext();

const initialState = {
  isLoading: false,
  userData: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useUser();
  const userclerkId = user?.id;
  // const [userData, setUserData] = useState([]);
  const [scoringCriteria, setScoringCriteria] = useState({skillMatch : 40, experienceLevel : 30, answeringCapability : 25, pricing: 5});

  const getUserDetails = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      if (userclerkId) {
        const response = await axios.get(
          `http://localhost:3000/user/clerk/${userclerkId}`
        );
        const User = response.data.user;
        // setUserData(User);
        dispatch({ type: "SET_USER_DATA", payload: User });
      }
    } catch (error) {
      console.log("Can't fetch user Data");
    }
  };

  const setScoreDetails = async(score) => {
    setScoringCriteria(score);
  }

  const getScoreDetails = async() => {
    return scoringCriteria;
  }

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ ...state, getUserDetails, setScoreDetails, getScoreDetails }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };

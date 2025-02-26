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

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ ...state, getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };

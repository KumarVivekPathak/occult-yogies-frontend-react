import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../service/APIFunctions";
import type { User } from "../service/types";
import Cookies from "js-cookie";

interface UserContextType {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading : boolean;
  logout : () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  isLoading : true,
  logout: () => {}
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('authToken');
    setUserData(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const fetchUserProfile = async () => {
    const token = Cookies.get('authToken');
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/login');
      return;
    }

    try{
      const response = await getUserProfile();
      const responseUserData = response.data.user;
      const responseAmitData = response.data.amitlogin;
      const userDataObj = {
          id: responseUserData.id,
          name: responseUserData.name,
          email: responseUserData.email,
          phone : responseAmitData.phone,
          creationDate: responseUserData.created_at,
    }
    setUserData(userDataObj); 
      setIsAuthenticated(true);
    }catch(error){
      console.error("Get user profile failed:", error);
      logout();
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, isAuthenticated, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

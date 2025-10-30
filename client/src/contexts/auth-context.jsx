import { auth } from "@/firebase.config";
import { privateApi } from "@/hooks/useAxios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (name) => {
    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    setLoading(false);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const authValues = {
    user,
    setUser,
    signIn,
    createUser,
    loading,
    updateUserProfile,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const token = localStorage.getItem("token");

        if (token) {
          privateApi
            .get("/auth/me")
            .then((response) => {
              const userData = response.data.data;
              setUser({ ...currentUser, ...userData });
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        }

        setLoading(false);
        console.log("CurrentUser-->", currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false);
        console.log("CurrentUser-->", currentUser);
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

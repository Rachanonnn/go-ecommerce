"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/libs/auth/firebase";
import addUser from "@/libs/user/addUsertoData";
import getUserbyID from "@/libs/user/getUserbyID";
import setToken from "@/libs/user/cookies";
import { deleteCookie } from "cookies-next";

interface AuthContextType {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (userNewData: any) => Promise<void>;
  logOut: () => Promise<void>;
}

const UserAuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserAuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const logIn = async (email: string, password: string) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUserbyID(userData.user.uid);
    const token: string = user.data.token;
    await setToken(token);
  };

  const signUp = async (userNewData: any) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      userNewData.email,
      userNewData.password
    );
    const newUser = {
      user_id: userData.user.uid,
      first_name: userNewData.first_name,
      last_name: userNewData.last_name,
      email: userNewData.email,
      tel: userNewData.tel,
      role: "user",
    };
    await addUser(newUser);
  };

  const logOut = async () => {
    deleteCookie("token");
    return signOut(auth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error(
      "useUserAuth must be used within a UserAuthContextProvider"
    );
  }
  return context;
};

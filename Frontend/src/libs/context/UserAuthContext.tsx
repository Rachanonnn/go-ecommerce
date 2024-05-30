"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/libs/auth/firebase";
import addUser from "../user/addUsertoData";
import getUserbyID from "../user/getUserbyID";
import setToken from "@/libs/user/cookies";
import { deleteCookie } from "cookies-next";

interface AuthContextType {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (userNewData: any) => Promise<void>;
  logOut: () => Promise<void>;
}

const userAuthContext = createContext<AuthContextType | undefined>(undefined);

export function UserAuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logIn = async (email: string, password: string) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUserbyID(userData.user.uid);
    // console.log(user);
    const token: string = user.data.token;
    // console.log(token);
    await setToken(token);
  };

  const signUp = async (userNewData: any) => {
    // console.log(userNewData.email);
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
    // send data to backend
    await addUser(newUser);
    // 1 email
    // 2 user_id or uid from firebase
    // console.log(userData.user);
  };

  const logOut = async () => {
    deleteCookie("token");
    return signOut(auth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Auth", currentUser);
        setUser(currentUser);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(userAuthContext);
  if (context === undefined) {
    throw new Error(
      "useUserAuth must be used within a UserAuthContextProvider"
    );
  }
  return context;
}

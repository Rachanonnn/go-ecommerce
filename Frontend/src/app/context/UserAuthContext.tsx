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
import { auth } from "../auth/firebase";

interface AuthContextType {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const userAuthContext = createContext<AuthContextType | undefined>(undefined);

export function UserAuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const userData = await createUserWithEmailAndPassword(auth, email, password);
    // send data to backend
    // 1 email
    // 2 user_id or uid from firebase
    console.log(userData.user)
  };

  const logOut = async () => {
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

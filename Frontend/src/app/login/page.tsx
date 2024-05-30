"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/libs/context/UserAuthContext";
import { newAuth, provider } from "@/libs/auth/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import checkUser from "@/libs/user/checkUser";
import { IconKey, IconLogin, IconMail } from "@tabler/icons-react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const router = useRouter();
  // const signIn = () => newAuth.signInWithPopup(provider);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    // console.log("useEffect triggered");
    const unsubscribe = newAuth.onAuthStateChanged(async (user) => {
      // console.log("Auth state changed", user);
      setUser(user);
      if (user !== null) {
        await checkUser(user);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = () => {
    newAuth
      .signInWithPopup(provider)
      .then(() => {
        router.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      router.push("/");
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl md:text-2xl font-bold mx-auto mt-8 mb-8">
        Log In
      </h1>
      {error && (
        <div className="text-red-500 text-center text-lg md:text-xl font-bold mx-auto mt-8 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="w-96 mx-auto flex flex-col gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <IconMail size={20} stroke={2} className="text-slate-500" />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Username" />
        </label> */}
        <label className="input input-bordered flex items-center gap-2">
          <IconKey size={20} stroke={2} className="text-slate-500" />
          <input
            type="password"
            className="grow"
            // value="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="btn justify-center mx-auto mt-4 w-full"
          onClick={() => router.push("/")}
        >
          <IconLogin size={20} stroke={2} className="text-slate-600" />
          <p>Sign In</p>
        </button>
        <a className="btn" onClick={handleSignInWithGoogle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <p>Sign in with Google</p>
        </a>
        <div className="mt-0 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <span
            className="underline text-emerald-400 cursor-pointer hover:text-emerald-500 duration-300"
            onClick={() => router.push("/register")}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default page;

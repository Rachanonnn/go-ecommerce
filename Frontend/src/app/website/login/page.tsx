"use client";

import React from "react";
import { SignInWithGoogle } from "@/Components/SignInWithGoogle";
import { LoginForm } from "@/Components/LoginForm";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="hero min-h-screen gride md:block">
      <div className="hero-content text-center flex flex-col justify-center mx-auto">
        <h1 className="text-center text-xl md:text-2xl font-bold mx-auto mt-0 md:mt-8 mb-8">
          Log In
        </h1>
        <div className="w-96 mx-auto flex flex-col gap-4">
          <LoginForm />
          <SignInWithGoogle />
          <div className="mt-0 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <span
              className="underline text-emerald-400 cursor-pointer hover:text-emerald-500 duration-300"
              onClick={() => router.push("/website/register")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

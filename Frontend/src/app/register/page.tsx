"use client";

import { RegisterForm } from "@/Components/RegisterForm";
import { SignUpWithGoogle } from "@/Components/SignUpWithGoogle";
import React from "react";

const page = () => {
  return (
    <>
      <div className="hero min-h-screen gride md:block">
        <div className="hero-content text-center flex flex-col justify-center mx-auto">
          <h1 className="text-center text-xl md:text-2xl font-bold mx-auto mt-0 md:mt-8 mb-8">
            Register
          </h1>
          <div className="w-96 mx-auto flex flex-col gap-4 ">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

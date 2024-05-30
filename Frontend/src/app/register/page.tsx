"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../libs/context/UserAuthContext";
import {
  IconKey,
  IconLogin,
  IconLogout,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";

const page = () => {
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      first_name: e.currentTarget.first_name.value,
      last_name: e.currentTarget.last_name.value,
      email: e.currentTarget.email.value,
      tel: e.currentTarget.tel.value,
      password: e.currentTarget.password.value,
    };
    // console.log(newUser);
    setError("");
    try {
      await signUp(newUser);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl md:text-2xl font-bold mx-auto mt-8 mb-8">
        Register
      </h1>
      {error && (
        <div className="text-red-500 text-center text-lg md:text-xl font-bold mx-auto mt-8 mb-4">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-96 mx-auto flex flex-col gap-4"
      >
        <label className="input input-bordered flex items-center gap-2">
          <IconMail size={20} stroke={2} className="text-slate-500" />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IconUser size={20} stroke={2} className="text-slate-500" />
          <input
            type="text"
            className="grow"
            placeholder="Firstname"
            name="first_name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IconUser size={20} stroke={2} className="text-slate-500" />
          <input
            type="text"
            className="grow"
            placeholder="Lastname"
            name="last_name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IconPhone size={20} stroke={2} className="text-slate-500" />
          <input type="text" className="grow" placeholder="Tel" name="tel" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IconKey size={20} stroke={2} className="text-slate-500" />
          <input
            type="password"
            className="grow"
            // value="password"
            placeholder="Password"
            name="password"
          />
        </label>
        <button
          type="submit"
          className="btn btn-wide justify-center mx-auto mt-4"
        >
          <IconLogin size={20} stroke={2} className="text-slate-600" />
          <p>Sign Up</p>
        </button>
        <div className="mt-0 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span
            className="underline text-emerald-400 cursor-pointer hover:text-emerald-500 duration-300"
            onClick={() => router.push("/login")}
          >
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
};

export default page;

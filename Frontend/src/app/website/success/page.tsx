"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="min-h-[81vh]">
      <div className="flex flex-col mx-auto w-[40vw] mt-10 bg-slate-200 rounded-xl">
        <h1 className="md:text-2xl font-bold pt-10 text-center px-5">
          Thank you for shopping with us !
        </h1>
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjJ3ZnRqMWVuNDB5Z25kN3h5NmV0cnlmM3htMW11MmZ3eWJvOTF0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R6gvnAxj2ISzJdbA63/giphy.webp"
          alt="Thankyou GIF"
          className="rounded-3xl mx-auto mt-5 h-56"
        />
        <span className="flex gap-5 justify-center mt-5 pb-10">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/website/products")}
          >
            Shop more
          </button>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/website/history")}
          >
            History
          </button>
        </span>
      </div>
    </div>
  );
};

export default page;

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/libs/context/UserAuthContext";
import "firebase/compat/auth";
import { IconKey, IconLogin, IconMail } from "@tabler/icons-react";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useUserAuth();
    const router = useRouter();

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
        <>
            {error && (
                <div className="text-red-500 text-center text-lg md:text-xl font-bold mx-auto mt-8 mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <label className="input input-bordered flex items-center gap-2">
                    <IconMail size={20} stroke={2} className="text-slate-500" />
                    <input
                        type="email"
                        className="grow"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <IconKey size={20} stroke={2} className="text-slate-500" />
                    <input
                        type="password"
                        className="grow"
                        // value="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="btn justify-center mx-auto mt-4 w-full">
                    <IconLogin size={20} stroke={2} className="text-slate-600" />
                    <p>Sign In</p>
                </button>
            </form>
        </>
    )
}

"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SigninButton = () => {
    const router = useRouter();
    const { data: session } = useSession();

    if (session && session.user) {
        console.log("session", session);
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.name}</p>
                <button onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </button>
            </div>
        );
    }
    return (
        <button
            onClick={() => router.push("/UserPost")}
            className="text-green-600 ml-auto"
        >
            Sign In
        </button>
    );
};

export default SigninButton;

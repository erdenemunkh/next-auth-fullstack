import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const UserPostPage = async () => {
    const session = await getServerSession(authOptions)
    const res = await fetch(`http://localhost:3000/api/user/${session.user.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${session.user.accessToken}`
        }
    })
    const data = await res.json();

    return (
        <div className="flex flex-col gap-4 p-10">
            <div>Only Authenticated user should access to this page</div>
            <code className="block whitespace-pre overflow-x-scroll" v-text="dataset.bibText">{JSON.stringify(session.user)}</code>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPostPage;
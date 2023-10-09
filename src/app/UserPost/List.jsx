"use client";
import React from "react";

export default function List({ data, session }) {
    return (
        <div className="flex flex-col gap-4 p-10">
            <div>Only Authenticated user should access to this page</div>
            <code
                className="block whitespace-pre overflow-x-scroll"
                v-text="dataset.bibText"
            >
                {JSON.stringify(session.user)}
            </code>
            <button onClick={() => console.log("clicked")}>GET DATA</button>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

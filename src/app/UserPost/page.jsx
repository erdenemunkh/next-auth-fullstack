import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import List from "./List";

const UserPostPage = async () => {
    const session = await getServerSession(authOptions);
    const res = await fetch(
        `http://localhost:3000/api/user/${session.user.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${session.user.accessToken}`,
            },
        }
    );
    const data = await res.json();

    return <List data={data} session={session} />;
};

export default UserPostPage;

import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const accessToken = request.headers.get("authorization");
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(
            JSON.stringify({
                error: "unauthorized",
            }),
            {
                status: 401,
            }
        );
    }
    const userPosts = await prisma.post.findMany({
        where: { authorId: +params.id },
        include: {
            author: {
                select: {
                    email: true,
                    name: true,
                },
            },
        },
    });

    return NextResponse.json(userPosts);
}
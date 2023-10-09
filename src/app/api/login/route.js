import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export async function POST(request) {
    const body = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        },
    });

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken,
        };
        return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
}
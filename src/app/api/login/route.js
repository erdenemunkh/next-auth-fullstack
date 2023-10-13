import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { userSchema } from "../../../../prisma/schemas/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        let validated

        try {
            validated = await userSchema.validate({
                email: body.username,
                password: body.password
            });
        } catch (error) {
            return NextResponse.json(error.errors);
        }

        const user = await prisma.user.findFirst({
            where: {
                email: validated.email,
            },
        });

        if (user && (await bcrypt.compare(validated.password, user.password))) {
            const { password, ...userWithoutPass } = user;
            const accessToken = signJwtAccessToken(userWithoutPass);
            const result = {
                ...userWithoutPass,
                accessToken,
            };
            return NextResponse.json(result);
        } else {
            return NextResponse.json(null);
        }
    } catch (error) {
        return NextResponse.json(error);
    }
}
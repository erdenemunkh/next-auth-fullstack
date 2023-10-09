const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const demo1 = await prisma.user.upsert({
        where: { email: 'demo1@demo.com' },
        update: {},
        create: {
            email: 'demo1@demo.com',
            name: 'Demo1',
            password: await bcrypt.hash('123', 10),
            posts: {
                create: {
                    title: 'Check out Prisma with Next.js',
                    content: 'https://www.prisma.io/nextjs',
                    published: true,
                },
            },
        },
    })

    const demo2 = await prisma.user.upsert({
        where: { email: 'demo2@demo.com' },
        update: {},
        create: {
            email: 'demo2@demo.com',
            name: 'Demo2',
            password: await bcrypt.hash('123123', 10),
            posts: {
                create: [
                    {
                        title: 'Follow Prisma on Twitter',
                        content: 'https://twitter.com/prisma',
                        published: true,
                    },
                    {
                        title: 'Follow Nexus on Twitter',
                        content: 'https://twitter.com/nexusgql',
                        published: true,
                    },
                ],
            },
        },
    })
    console.log({ demo1, demo2 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
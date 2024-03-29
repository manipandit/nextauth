import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("request reached authorize ")
               try {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials?.email
                        },
                        select: {
                            id: true,
                            email: true,
                            password: true,
                        }
                    })
                    console.log(user)

                    if (user && user.password && (await bcrypt.compare(credentials?.password || "", user.password))) {
                        return {
                            id: user.id,
                            email: user.email,
                        }
                    } else {
                        return null;
                    }
               } catch (error) {
                    console.error(error);
               }
               return null;
            }
        }),    
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.uid
            }
            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
}
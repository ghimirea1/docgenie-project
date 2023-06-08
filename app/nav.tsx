import Hero from "./Hero";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return <Hero session={session} />;
}

"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Session() {

    const { data: session, status } = useSession()

    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
    };
    return (
        <>
            {session ? (
                <div className="flex flex-col items-start gap-2">
                    <p>Welcome, {session?.user?.name} </p>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
            ) : (
                <Button onClick={() => signIn("github")}>Sign In with GitHub</Button>
            )}
            <p className="text-xs italic text-gray-500">*Authentication is optional, for portfolio purposes only</p>

        </>
    )
}
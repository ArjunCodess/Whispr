import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header() {
     return (
          <div className="flex items-center p-3 sm:px-10 max-w-6xl mx-auto">
               <Link href="/" className="text-xl md:text-2xl font-semibold">Whispr</Link>

               <div className="flex-1" />

               <div className="flex items-center">
                    <SignedIn>
                         <UserButton />
                    </SignedIn>

                    <SignedOut>
                         <Button asChild>
                              <SignInButton />
                         </Button>
                    </SignedOut>
               </div>
          </div>
     );
}
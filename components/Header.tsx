import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
     Briefcase,
     HomeIcon,
     MessagesSquare,
     SearchIcon,
     UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Header() {
     return (
          <div className="flex items-center p-3 sm:px-10 max-w-6xl mx-auto">
               <h1 className="text-xl md:text-2xl font-semibold">Connectify</h1>

               <div className="flex-1" />

               <div className="flex items-center">
                    <SignedIn>
                         <UserButton />
                    </SignedIn>

                    <SignedOut>
                         <Button asChild variant="secondary">
                              <SignInButton />
                         </Button>
                    </SignedOut>
               </div>
          </div>
     );
}
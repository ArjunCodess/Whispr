import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import { Post } from "@/mongodb/models/post";
import { SignedIn } from "@clerk/nextjs";
import { connectToDatabase } from "@/mongodb/database";

export const revalidate = 0;

export default async function Home() {
     await connectToDatabase();

     const posts = await Post.getAllPosts();

     return (
          <div className="grid grid-cols-8 mt-5 sm:px-5 gap-4">
               <section className="col-span-full md:col-span-6 xl:col-span-6 w-full mx-auto">
                    <SignedIn>
                         <PostForm />
                    </SignedIn>
                    <PostFeed posts={posts} />
               </section>
               
               <section className="hidden md:inline md:col-span-2">
                    <UserInformation posts={posts} />
               </section>
          </div>
     );
}
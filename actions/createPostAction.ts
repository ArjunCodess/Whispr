'use server'

import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server"

export default async function createPostAction(formData: FormData) {
     const user = await currentUser();

     if (!user) throw new Error('User not authenticated.');

     const postInput = formData.get('postInput') as string;

     if (!postInput) throw new Error('You must provide a post input.');

     const userDB: IUser = {
          userId: user.id,
          userImage: user.imageUrl,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          username: user.username || "",
     }

     try {
          const body = {
               user: userDB,
               text: postInput,
          };

          await Post.create(body);
     }
     
     catch (error: any) {
          console.log("Error :: createPostAction : ", error);
     }
}
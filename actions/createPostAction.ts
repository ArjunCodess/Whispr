"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongodb/models/post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from "next/cache";

export default async function createPostAction(formData: FormData) {
     const user = await currentUser();
     const postInput = formData.get("postInput") as string;
     const image = formData.get("image") as File;
     let image_url = undefined;

     if (!postInput) throw new Error("Post input is required");

     if (!user?.id) throw new Error("User not authenticated");

     const userDB: IUser = {
          userId: user.id,
          userImage: user.imageUrl,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          username: user.username || "",
     };

     try {
          if (image.size > 0) {
               cloudinary.config({
                    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET
               });

               const arrayBuffer = await image.arrayBuffer();
               const buffer = new Uint8Array(arrayBuffer);

               await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: 'whispr' }, function (error, image) {
                         if (error) {
                              reject(error);
                              return;
                         }

                         // image?.public_id | image?.url
                         image_url = image?.url;
                         
                         resolve(image);
                    }).end(buffer);
               })

               // console.log("File uploaded successfully! URL: ", image_url);

               const body: AddPostRequestBody = {
                    user: userDB,
                    text: postInput,
                    imageUrl: image_url,
               };

               await Post.create(body);
          }

          else {
               const body: AddPostRequestBody = {
                    user: userDB,
                    text: postInput,
               };

               await Post.create(body);
          }
     }

     catch (error: any) {
          throw new Error("Failed to create post", error);
     }

     revalidatePath("/");
}
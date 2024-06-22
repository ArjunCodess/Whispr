"use client";

// import createPostAction from "@/actions/createPostAction";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

/**
 * PostForm component for creating a new post.
 *
 * @returns {React.ReactElement} - The PostForm component.
 */

export default function PostForm() {
     // Refs for form and file input elements
     const ref = useRef<HTMLFormElement>(null);
     const fileInputRef = useRef<HTMLInputElement>(null);

     // State for image preview
     const [preview, setPreview] = useState<string | null>(null);

     // User context from Clerk
     const { user } = useUser();

     /**
      * Handles the post creation action.
      *
      * @param {FormData} formData - The form data containing the post input and image.
      * @returns {Promise<void>} - A promise that resolves when the post is created.
      * @throws {Error} - Throws an error if the post input is empty.
      */

     const handlePostAction = async (formData: FormData): Promise<void> => {
          const formDataCopy = formData;
          ref.current?.reset();

          const text = formDataCopy.get("postInput") as string;

          if (!text) throw new Error("You must provide a post input");

          setPreview(null);

          try {
               // await createPostAction(formDataCopy);
               return;
          } catch (error: any) {
               toast.error(`Error creating post: ${error}`);
          }
     };

     /**
      * Handles the image change event.
      *
      * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
      */

     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];

          if (file) setPreview(URL.createObjectURL(file));
     };

     return (
          <div className="mb-2">
               <form
                    ref={ref}
                    action={(formData) => {
                         const promise = handlePostAction(formData);
                         toast.promise(promise, {
                              loading: "Creating post...",
                              success: "Post created!",
                              error: (e: any) => "Error creating post: " + e.message,
                         });
                    }}
                    className="p-3 bg-white rounded-lg border"
               >
                    <div className="flex items-center space-x-2">
                         <Avatar>
                              <AvatarImage src={user?.imageUrl} />
                              <AvatarFallback>
                                   {user?.firstName?.charAt(0)}
                                   {user?.lastName?.charAt(0)}
                              </AvatarFallback>
                         </Avatar>

                         <input type="text" name="postInput" placeholder="Start writing a post..." className="flex-1 outline-none rounded-full py-3 px-4 border" />

                         <input ref={fileInputRef} type="file" name="image" accept="image/*" hidden onChange={handleImageChange} />

                         <Button type="submit">Post</Button>
                    </div>

                    {preview && <div className="mt-2">
                         <img src={preview} alt="Preview" className="w-full object-cover" />
                    </div>}

                    <div className="flex justify-end mt-2">
                         <Button type="button" onClick={() => fileInputRef.current?.click()} variant={preview ? "secondary" : "outline"}>
                              <ImageIcon className="mr-2" size={16} color="currentColor" />
                              {preview ? "Change" : "Add"} Image
                         </Button>

                         {preview && (
                              <Button type="button" onClick={() => setPreview(null)} variant="outline" className="ml-2">
                                   <XIcon className="mr-2" size={16} color="currentColor" />
                                   Remove Image
                              </Button>
                         )}
                    </div>
               </form>

               <hr className="mt-2 border-gray-300" />
          </div>
     );
}
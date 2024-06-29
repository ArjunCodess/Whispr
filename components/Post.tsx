"use client";

import { Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";
import PostOptions from "./PostOptions";
import deletePostAction from "@/actions/deletePostAction";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ReactTimeago from "react-timeago";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";

export default function Post({ post }: { post: IPostDocument }) {
     const { user } = useUser();
     const isAuthor = user?.id === post.user.userId;

     const [isExpanded, setIsExpanded] = useState(false);

     const toggleReadMore = () => setIsExpanded(!isExpanded);

     return (
          <div className="bg-white rounded-md border">
               <div className="p-4 flex space-x-2">
                    <div>
                         <Avatar>
                              <AvatarImage src={post.user.userImage} />
                              <AvatarFallback>
                                   {post.user.firstName?.charAt(0)}
                                   {post.user.lastName?.charAt(0)}
                              </AvatarFallback>
                         </Avatar>
                    </div>

                    <div className="flex justify-between flex-1">
                         <div>
                              <p className="font-semibold">
                                   {post.user.firstName} {post.user.lastName}{" "}
                                   <span className="text-xs text-gray-600">
                                        @{post.user.username}
                                   </span>
                                   {isAuthor && (
                                        <Badge className="ml-2">
                                             You
                                        </Badge>
                                   )}
                              </p>

                              <p className="text-xs text-gray-400">
                                   <ReactTimeago date={new Date(post.createdAt)} />
                              </p>
                         </div>

                         {isAuthor && (
                              <Button
                                   variant="outline"
                                   onClick={() => {
                                        const promise = deletePostAction(post._id as string);
                                        toast.promise(promise, {
                                             loading: "Deleting post...",
                                             success: "Post deleted!",
                                             error: "Error deleting post",
                                        });
                                   }}
                                   className="px-2"
                              >
                                   <Trash2 className="h-5" />
                              </Button>
                         )}
                    </div>
               </div>

               <div>
                    <div>
                         <div className="px-4 pb-2 mt-2">
                              {isExpanded ? post.text : post.text.length > 200 ? post.text.slice(0, 200) + "..." : post.text}
                              {post.text.length > 200 && (
                                   <button onClick={toggleReadMore} className="text-blue-500 inline">
                                        {isExpanded ? 'Read Less' : 'Read More'}
                                   </button>
                              )}
                         </div>
                    </div>

                    {/* If image uploaded put it here... */}
                    {post.imageUrl && (
                         <Image
                              src={post.imageUrl}
                              alt="Post Image"
                              width={500}
                              height={500}
                              className="w-full mx-auto border-t"
                         />
                    )}
               </div>

               <PostOptions postId={post._id as string} post={post} />
          </div>
     );
}
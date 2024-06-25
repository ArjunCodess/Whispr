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

export default function Post({ post }: { post: IPostDocument }) {
     const { user } = useUser();
     const postUserId = post.user.userId;
     const isAuthor = user?.id === postUserId;
     
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
                                   {isAuthor && (
                                        <Badge className="ml-2" variant="secondary">
                                             Author
                                        </Badge>
                                   )}
                              </p>
                              <p className="text-xs text-gray-400">
                                   @{post.user.username}
                              </p>

                              <p className="text-xs text-gray-400">
                                   <ReactTimeago date={new Date(post.createdAt)} />
                              </p>
                         </div>

                         {isAuthor && (
                              <Button
                                   variant="outline"
                                   onClick={() => {
                                        const promise = deletePostAction(post._id);
                                        toast.promise(promise, {
                                             loading: "Deleting post...",
                                             success: "Post deleted!",
                                             error: "Error deleting post",
                                        });
                                   }}
                              >
                                   <Trash2 />
                              </Button>
                         )}
                    </div>
               </div>

               <PostOptions postId={post._id} post={post} />
          </div>
     );
}
'use server'

import { currentUser } from "@clerk/nextjs/server"

export default async function createPostAction(formData: FormData) {
     const user = await currentUser();

     if (!user) throw new Error('User not authenticated.');

     const postInput = formData.get('postInput') as string;
     const image = formData.get('image') as string;
     let imageUrl: string | undefined;

     if (!postInput) throw new Error('You must provide a post input.');
}
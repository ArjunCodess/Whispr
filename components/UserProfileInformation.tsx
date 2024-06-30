import React from 'react'
import { Avatar } from './ui/avatar'
import { UserProfile } from '@/types/user'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export default function UserProfileInformation({ userInfo }: { userInfo: UserProfile }) {
     console.log(userInfo)

     return (
          <div className="space-y-8 md:grid grid-cols-2">
               <div className="flex items-center space-x-4 col-span-1">
                    <Avatar className="h-16 w-16">
                         {userInfo?.id ? <AvatarImage src={userInfo?.image_url} /> : <AvatarImage src={`https://avatar.vercel.sh/${userInfo?.username}` || "https://github.com/shadcn.png"} />}
                         <AvatarFallback>{userInfo?.first_name.charAt(0)}{userInfo?.last_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                         <h1 className="text-2xl font-bold">{userInfo?.first_name} {userInfo?.last_name}</h1>
                         <h2 className="text-md">@{userInfo?.username}</h2>
                    </div>
               </div>
               <div className='space-x-4 col-span-1 grid grid-cols-4 text-center'>
                    <div className='col-span-1 md:-mt-5'>
                         <h3 className='text-xl font-semibold'>23K</h3>
                         <p>followers</p>
                    </div>
                    <div className='col-span-1 md:-mt-5'>
                         <h3 className='text-xl font-semibold'>234</h3>
                         <p>following</p>
                    </div>
                    <div className='col-span-1 md:-mt-5'>
                         <h3 className='text-xl font-semibold'>23K</h3>
                         <p>posts</p>
                    </div>
                    <div className='col-span-1 md:-mt-5'>
                         <h3 className='text-xl font-semibold'>234</h3>
                         <p>comments</p>
                    </div>
               </div>
          </div>
     )
}
import React, { useEffect, useState } from 'react'
import UserProfileInformation from './UserProfileInformation'
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function UserProfileSection({ username }: { username: string }) {
     const [userData, setUserData] = useState<Array<any>>();
     const [followed, setFollowed] = useState(false);

     useEffect(() => {
          async function fetchData() {
               try {
                    const response = await fetch(`/api/get-user-from-username?username=${username}`);
                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setUserData(data);
               }

               catch (error: any) {
                    console.error('Error fetching data:', error);
                    toast.error('Error fetching data: ', error);
               }
          }

          fetchData();
     }, [username]);

     return (
          <div className='p-2 py-16 sm:py-20 md:py-30 space-y-10'>
               <div>
                    <UserProfileInformation userInfo={userData?.[0]} />
               </div>

               <div>
                    {followed
                         ? <Button className='w-full' variant="outline">Unfollow</Button>
                         : <Button className='w-full'>Follow</Button>}
               </div>
          </div>
     )
}

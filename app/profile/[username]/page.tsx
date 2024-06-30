'use client'

import UserProfileSection from '@/components/UserProfileSection';
import { useParams } from 'next/navigation'

export default function Page() {
     const params = useParams<{ username: string }>();
     const username = params.username;

     return (
          <UserProfileSection username={username} />
     )
}
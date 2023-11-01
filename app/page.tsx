'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(()=>{
    async function getUser() {
			const { data } = await supabase.auth.getUser();
			const { user } = data;
			if (user) {
				router.push('/landing');
			}
		}

		getUser();
  },[]);

  return (
    <div></div>
  )
}

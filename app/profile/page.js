'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  async function handleEdit() {}

  async function handleDelete() {}

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session?.user]);

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  async function handleEdit(prompt) {
    router.push(`/update-prompt?id=${prompt._id}`);
  }

  async function handleDelete(prompt) {
    const hasConfirmedDelete = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmedDelete) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPrompts = posts.filter((post) => post._id !== prompt._id);
        setPosts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  }

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

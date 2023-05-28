'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

export default function ProfilePage() {
  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={[]}
      handleEdit={() => {}}
      handleDelet={() => {}}
    />
  );
}

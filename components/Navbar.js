'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    async function getAllProviders() {
      const response = await getProviders();
      setProviders(response);
    }

    getAllProviders();
  }, []);

  function renderProviders() {
    return (
      <>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'
            >
              Sign In
            </button>
          ))}
      </>
    );
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptmania Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptmania</p>
      </Link>

      {/* Desktop Nav */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                alt='profile'
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          renderProviders()
        )}
      </div>

      {/* Mobile Nav */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              alt='profile'
              width={37}
              height={37}
              className='rounded-full cursor-pointer'
              onClick={() => setToggleMenu((prev) => !prev)}
            />
            {toggleMenu && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleMenu(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleMenu(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          renderProviders()
        )}
      </div>
    </nav>
  );
}

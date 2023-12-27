'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  /*
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }
  */

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  /*
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  */

  return (
    <main className="flex h-fit flex-col items-center p-24 space-y-12">
      <input
        name='email'
        className="w-1/3 min-w-80 h-12 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none whitespace-normal resize-none overflow-hidden"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='Email'
      />
      <input
        type='password'
        name='password'
        className="w-1/3 min-w-80 h-12 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none whitespace-normal resize-none overflow-hidden"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder='Password'
      />
      <div className='flex flex-row space-x-5'>
        <button className='w-1/8 h-1/5 bg-lightGray rounded p-3 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1' onClick={handleSignIn}>Sign in</button>
      </div>
      <div>Don't have an account? <Link href='\signup'>Sign up</Link></div>
    </main>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader } from '@mantine/core'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <form className="flex h-fit flex-col items-center p-24 space-y-12" action="/auth/login" method='post'>
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
        <button className='w-1/8 h-1/5 bg-lightGray rounded p-3 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1' onClick={() => setLoading(true)}>
          { loading ? <Loader type='dots' color='black' /> : <div>Sign in</div>}
        </button>
      </div>
      <div>Don't have an account? <Link href='\signup'>Sign up</Link></div>
    </form>
  )
}